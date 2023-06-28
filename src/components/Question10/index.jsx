import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useState } from 'react';

import axios from '../../services/axios';
import { regionTypes } from '../../propTypes/answers';
import { Button, Loader } from '../../styles/GlobalStyles';

export default function Question10({ regions }) {
  const [answer, setAnswer] = useState('');
  const [region, setRegion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function search() {
    setIsLoading(true);
    setAnswer('');
    try {
      const { data } = await axios.get(
        `/transations/highest-transation-vl-region?region=${region}`
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
        10. Qual cidade, estado, ano e mês em que ocorreu o maior pico de
        transações para determinada região?
      </p>
      <div className="row gy-4">
        <div className="col-md-4 col-lg-3 pt-1">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option disabled value="select">
              Selecione a região
            </option>
            {regions &&
              regions.map((regionItem) => (
                <option value={regionItem.id} key={regionItem.id}>
                  {regionItem.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-3 col-lg-2 pt-1">
          <Button disabled={!region} onClick={search} className="w-100">
            <Loader isLoading={isLoading} />
            Buscar
          </Button>
        </div>
        {answer && (
          <p className="col-md-4 col-lg-8">
            Total: {new Intl.NumberFormat('pt-BR').format(answer.trans_total)}
            <br /> Mês: {answer.month}
            <br /> Ano: {answer.year}
            <br /> Cidade: {answer.city}
            <br /> Estado: {answer.state}
          </p>
        )}
      </div>
    </div>
  );
}

Question10.propTypes = regionTypes.isRequired;
