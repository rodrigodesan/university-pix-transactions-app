import { useState, useCallback, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';

import { Container, Loader } from '../../styles/GlobalStyles';
import { QuestionsBox } from './styled';
import Question1 from '../../components/Question1';
import Question2 from '../../components/Question2';
import Question3 from '../../components/Question3';

export default function Home() {
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadYears = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/years');
      setYears(data);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 400) errors.map((error) => toast.error(error));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadYears();
  }, [loadYears]);
  return (
    <>
      <Loader isLoading={isLoading} />
      <Container>
        <h1 className="text-center">Perguntas</h1>
        <QuestionsBox>
          <Question1 years={years} />
          <Question2 years={years} />
          <Question3 years={years} />
        </QuestionsBox>
      </Container>
    </>
  );
}
