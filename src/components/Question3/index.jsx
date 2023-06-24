import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState } from 'react';

import axios from '../../services/axios';
import { yearTypes } from '../../propTypes/answers';
import { Button, Loader } from '../../styles/GlobalStyles';

export default function Question3({ years }) {
  const [answer, setAnswer] = useState('');
  const [year, setyear] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  async function search() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/transations/max-pix-avg-region?year=${year}`
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
        3. Qual a região com a maior média de pix recebidos para um determinado
        ano?
      </p>
      <div className="row gy-4">
        <div className="col-md-4 col-lg-3 pt-1">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => {
              setyear(e.target.value);
              setIsBtnDisabled(false);
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
          <Button disabled={isBtnDisabled} onClick={search} className="w-100">
            <Loader isLoading={isLoading} />
            Buscar
          </Button>
        </div>
        {answer && (
          <p className="col-md-4 col-lg-6">
            Estado: {answer.state}
            <br /> Média: {answer.average}
          </p>
        )}
      </div>
    </div>
  );
}

Question3.propTypes = yearTypes.isRequired;
