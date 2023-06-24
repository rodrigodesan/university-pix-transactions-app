import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { Table } from 'react-bootstrap';
import axios from '../../services/axios';
import { yearTypes } from '../../propTypes/answers';
import { Button, Loader } from '../../styles/GlobalStyles';

export default function Question4({ years }) {
  const [answer, setAnswer] = useState([]);
  const [year, setyear] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function search() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/transations/pix-by-region?year=${year}`
      );
      if (!data) toast.error('Ano sem registros');
      setAnswer(data);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 400) errors.map((error) => toast.error(error));
    }
    setIsLoading(false);
  }
  return (
    <div className="mb-3">
      <p>
        4. Qual a quantidade de pix realizados por região para um determinado
        ano?
      </p>
      <div className="row gy-4 mb-4">
        <div className="col-md-4 col-lg-3 pt-1">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => setyear(e.target.value)}
          >
            <option disabled value="select">
              Selecione o ano
            </option>
            {years &&
              years.map((yearItem) => (
                <option value={yearItem.id} key={yearItem.id}>
                  {yearItem.year}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-3 col-lg-2 pt-1">
          <Button disabled={!year} onClick={search} className="w-100">
            <Loader isLoading={isLoading} />
            Buscar
          </Button>
        </div>
      </div>
      {answer.length > 0 && (
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Sigla</th>
              <th scope="col">Região</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {answer.map((item) => (
              <tr key={item.acronym}>
                <th scope="row">{item.acronym}</th>
                <td>{item.region}</td>
                <td>{item.pix_number}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

Question4.propTypes = yearTypes.isRequired;
