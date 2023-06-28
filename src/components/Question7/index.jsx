import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { Table } from 'react-bootstrap';
import axios from '../../services/axios';
import { yearTypes } from '../../propTypes/answers';
import { Button, Loader } from '../../styles/GlobalStyles';

export default function Question7({ years }) {
  const [answer, setAnswer] = useState('');
  const [year, setyear] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function search() {
    setIsLoading(true);
    setAnswer('');
    try {
      const { data } = await axios.get(
        `/transations/cities-diff-in-transation-vl?year=${year}&order=asc`
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
        7. Quais as 10 cidades que tiveram maior diferença negativa (valor maior
        saindo que entrando) de pix para um determinado ano?
      </p>
      <div className="row gy-4 mb-3">
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
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">Diferença</th>
            </tr>
          </thead>
          <tbody>
            {answer.map((item) => (
              <tr key={item.city_code}>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{Number(item.dif_rec_pay).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

Question7.propTypes = yearTypes.isRequired;
