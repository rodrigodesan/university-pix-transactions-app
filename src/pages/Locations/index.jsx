import { useState, useEffect, useCallback, useRef } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useApi } from '../../hooks/useApi';
import { googleMapsKey } from '../../constants/enviromentsVariables';
import Map from '../../components/Map';
import { Container, Loader } from '../../styles/GlobalStyles';
import { MapContainer } from './styled';

const defaultSettings = {
  center: { lat: -10.6738878, lng: -37.4681396 },
  zoom: 9,
}; // Região Central de Aracaju

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getLogins } = useApi();

  const getLoginsRef = useRef(getLogins);

  const searchLocation = async (lat, lng) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsKey}`
    );
    const { results } = response.data;
    return results;
  };

  const citiesSearch = useCallback(async (locatedLogins) => {
    const locationSearchs = [];
    let i;
    for (i = 0; i < locatedLogins.length; i++) {
      const { lat, lng } = locatedLogins[i];
      locationSearchs.push(searchLocation(lat, lng));
    }

    try {
      const allResults = await Promise.all(locationSearchs);
      let locatedCities = {};
      allResults.forEach((results) => {
        for (i = 0; i < results.length; i++) {
          const { formatted_address: formattedAddress, types } = results[i];
          if (types.includes('administrative_area_level_2')) {
            const citieQuant = locatedCities[formattedAddress];
            locatedCities[formattedAddress] = citieQuant ? citieQuant + 1 : 1;
            break;
          }
        }
      });
      locatedCities = Object.keys(locatedCities).map((citie) => {
        return [citie, locatedCities[citie]];
      });
      setCities(locatedCities);
    } catch (err) {
      toast.error(err);
    }
  }, []);

  const getLocations = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getLoginsRef.current();
      if (data) {
        const locatedLogins = data.reduce((acc, login) => {
          const [lat, lng] = [Number(login.latitude), Number(login.longitude)];
          const userName = login.User.name.split(' ')[0];
          if (lat && lng && userName) {
            acc.push({
              id: login.id,
              lat,
              lng,
              userName,
            });
          }
          return acc;
        }, []);
        await citiesSearch(locatedLogins);
        setLocations(locatedLogins);
      }
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
    setIsLoading(false);
  }, [citiesSearch]);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <Container>
      <h1>Localizações dos logins</h1>
      <MapContainer>
        <Loader isLoading={isLoading} />
        {locations && <Map locations={locations} {...defaultSettings} />}
      </MapContainer>
      {cities.length && (
        <ul className="mt-4">
          {cities.map((citie, index) => (
            <li key={index}>{`${citie[0]} (${citie[1]})`}</li>
          ))}
        </ul>
      )}
    </Container>
  );
}
