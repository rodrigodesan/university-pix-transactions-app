import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { FormCheck, Table } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import axios from '../../services/axios';
import { yearTypes } from '../../propTypes/answers';
import { Button, Loader } from '../../styles/GlobalStyles';

export default function Question5({ years }) {
  const [answer, setAnswer] = useState([]);
  const [year, setyear] = useState(0);
  const [months, setMonths] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectMonths(e) {
    const itemId = e.target.value;
    const currentMonths = [...selectedMonths];
    if (!currentMonths.includes(itemId)) {
      currentMonths.push(itemId);
    } else {
      const requirementIndex = currentMonths.indexOf(itemId);
      currentMonths.splice(requirementIndex, 1);
    }
    setSelectedMonths(currentMonths);
  }

  async function search() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `transations/cities-with-most-individual-transations?year=${year}&months=${String(
          selectedMonths
        )}`
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
        5.Quais os 10 municípios com mais número de transações por pessoas
        físicas em uma determinada faixa de tempo?
      </p>
      <div className="row gy-4 mb-4">
        <div className="col-md-4 col-lg-3 pt-1">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => {
              const yearId = Number(e.target.value);
              setyear(yearId);
              const yearMonths = years.find((item) => item.id === yearId);
              setMonths(yearMonths.YearMonths);
              setSelectedMonths([]);
            }}
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
          <Button
            disabled={!year || !selectedMonths.length}
            onClick={search}
            className="w-100"
          >
            <Loader isLoading={isLoading} />
            Buscar
          </Button>
        </div>
      </div>
      {months && (
        <div className="py-2">
          {months.map((month) => (
            <FormCheck className="form-check-inline" key={month.id}>
              <FormCheckInput
                type="checkbox"
                id={month.month_num}
                value={month.id}
                name="selectedMonths"
                checked={selectedMonths.includes(String(month.id))}
                onChange={handleSelectMonths}
              />
              <FormCheckLabel htmlFor={month.month_num}>
                {month.month}
              </FormCheckLabel>
            </FormCheck>
          ))}
        </div>
      )}
      {answer.length > 0 && (
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {answer.map((item) => (
              <tr key={item.city_code}>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.pix_individual}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

Question5.propTypes = yearTypes.isRequired;
