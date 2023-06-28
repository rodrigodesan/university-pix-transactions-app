import { useState, useCallback, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';

import { Container } from '../../styles/GlobalStyles';
import { QuestionsBox, Loader } from './styled';
import Question1 from '../../components/Question1';
import Question2 from '../../components/Question2';
import Question3 from '../../components/Question3';
import Question4 from '../../components/Question4';
import Question5 from '../../components/Question5';
import Question6 from '../../components/Question6';
import Question7 from '../../components/Question7';
import Question8 from '../../components/Question8';
import Question9 from '../../components/Question9';

export default function Home() {
  const [years, setYears] = useState([]);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async (route, stateFunction) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get(route);
      if (status < 200 || status > 299)
        toast.error(`Falha na requisição com status ${status}`);
      else stateFunction(data);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 400) errors.map((error) => toast.error(error));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData('/years', setYears);
    loadData('/states', setStates);
  }, [loadData]);
  return (
    <Container>
      <Loader isLoading={isLoading} />
      <h1 className="text-center">Perguntas</h1>
      <QuestionsBox>
        <Question1 years={years} />
        <Question2 years={years} />
        <Question3 years={years} />
        <Question4 years={years} />
        <Question5 years={years} />
        <Question6 />
        <Question7 years={years} />
        <Question8 years={years} />
        <Question9 years={years} states={states} />
      </QuestionsBox>
    </Container>
  );
}
