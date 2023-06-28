import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { Table } from 'react-bootstrap';
import axios from '../../services/axios';
import { Button, Loader } from '../../styles/GlobalStyles';

const avgs = [];
for (let i = 1; i <= 10; i++) {
  const val = i * 1000000000;
  avgs.push({
    key: i,
    val,
    val_formated: new Intl.NumberFormat('pt-BR').format(val),
  });
}

export default function Question6() {
  const [answer, setAnswer] = useState([]);
  const [minAvg, setMinAvg] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function search() {
    setIsLoading(true);
    setAnswer('');
    try {
      const { data } = await axios.get(
        `transations/higher-avg-on-vl-company-payer?minAvg=${minAvg}`
      );
      if (!data) toast.error('Não há transações acima desse valor');
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
        6. Quais municípios tiveram média superior a determinado valor em envios
        realizados por pessoas jurídicas em todo operíodo?
      </p>
      <div className="row gy-4 mb-3">
        <div className="col-md-4 col-lg-3 pt-1">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => {
              const avgSelect = Number(e.target.value);
              setMinAvg(avgSelect);
            }}
          >
            <option disabled value="select">
              Selecione o valor mínimo
            </option>
            {avgs &&
              avgs.map((avg) => (
                <option value={avg.val} key={avg.key}>
                  {avg.val_formated}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-3 col-lg-2 pt-1">
          <Button disabled={!minAvg} onClick={search} className="w-100">
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
              <th scope="col">Média</th>
            </tr>
          </thead>
          <tbody>
            {answer.map((item) => (
              <tr key={item.city_code}>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{Number(item.average).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
