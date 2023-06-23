import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';

import axios from '../../services/axios';

export default function Question1() {
  const [years, setYears] = useState([]);
  const [answer1, setAnswer1] = useState('');

  const loadYears = useCallback(async () => {
    try {
      const { data } = await axios.get('/years');
      setYears(data);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 400) errors.map((error) => toast.error(error));
    }
  }, []);

  useEffect(() => {
    loadYears();
  }, [loadYears]);

  async function selectYear(e) {
    try {
      const year = e.target.value;
      const { data } = await axios.get(
        `/transations/max-avg-state-by-vl-per-qt/${year}`
      );
      if (!year) toast.error('Ano sem registros');
      setAnswer1(data);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 400) errors.map((error) => toast.error(error));
    }
  }
  return (
    <div className="mb-3">
      <p>
        1. Qual o estado com a maior média de valores enviados por quantidade de
        transações para um determinado ano?
      </p>
      <div className="row">
        <div className="col-lg-3">
          <select
            defaultValue="select"
            className="form-select mt-1"
            onChange={selectYear}
          >
            <option disabled value="select">
              Selecione o ano
            </option>
            {years &&
              years.map((year) => (
                <option value={year.id} key={year.id}>
                  {year.year}
                </option>
              ))}
          </select>
        </div>
        {answer1 && (
          <p className="col-lg-8">
            Estado: {answer1.state}
            <br /> Média: {answer1.average}
          </p>
        )}
      </div>
    </div>
  );
}
