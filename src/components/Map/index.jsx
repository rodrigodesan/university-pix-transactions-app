import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { arrayOf, shape, number } from 'prop-types';
import { Loader } from '../../styles/GlobalStyles';

export default function Map({ locations, center, zoom }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Loader isLoading={!isLoaded} />
      <GoogleMap
        center={center}
        zoom={zoom}
        mapContainerClassName="w-100 h-100"
      >
        {locations.map((location) => (
          <MarkerF
            position={{ lat: location.lat, lng: location.lng }}
            key={location.id}
          >
            {location.userName}
          </MarkerF>
        ))}
      </GoogleMap>
    </>
  );
}

Map.propTypes = {
  locations: arrayOf(
    shape({
      id: number,
      lat: number,
      lng: number,
    })
  ).isRequired,
  center: shape({
    lat: number,
    lng: number,
  }).isRequired,
  zoom: number.isRequired,
};
