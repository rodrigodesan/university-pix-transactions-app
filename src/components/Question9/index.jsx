import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState } from 'react';

import axios from '../../services/axios';
import { yearTypes, stateTypes } from '../../propTypes/answers';
import { Button, Loader } from '../../styles/GlobalStyles';

export default function Question9({ years, states }) {
  const [answer, setAnswer] = useState('');
  const [year, setyear] = useState(0);
  const [state, setState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function search() {
    setIsLoading(true);
    setAnswer('');
    try {
      const { data } = await axios.get(
        `/transations/highest-transation-vl-state-year?year=${year}&state=${state}`
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
        10. Para determinado estado, em qual mês de determinado ano ocorreu o
        maior volume de transações, incluindo transações enviadas e recebidas
        por pessoas físicas e jurídicas?
      </p>
      <div className="row gy-4">
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
        <div className="col-md-4 col-lg-3 pt-1">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => setState(e.target.value)}
          >
            <option disabled value="select">
              Selecione o estado
            </option>
            {states &&
              states.map((stateItem) => (
                <option value={stateItem.id} key={stateItem.id}>
                  {stateItem.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-3 col-lg-2 pt-1">
          <Button disabled={!year || !state} onClick={search} className="w-100">
            <Loader isLoading={isLoading} />
            Buscar
          </Button>
        </div>
        {answer && (
          <p className="col-md-4 col-lg-6">
            Mês: {answer.month}
            <br /> Total:{' '}
            {new Intl.NumberFormat('pt-BR').format(answer.trans_total)}
          </p>
        )}
      </div>
    </div>
  );
}

Question9.propTypes = {
  years: yearTypes.isRequired,
  states: stateTypes.isRequired,
};
