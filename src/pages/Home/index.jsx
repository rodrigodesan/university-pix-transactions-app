import { useState, useCallback, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';

import { Container, Loader } from '../../styles/GlobalStyles';
import { QuestionsBox } from './styled';
import Question1 from '../../components/Question1';
import Question2 from '../../components/Question2';

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
    <Container>
      <Loader isLoading={isLoading} />
      <h1 className="text-center">Perguntas</h1>
      <QuestionsBox>
        <Question1 years={years} />
        <Question2 years={years} />
      </QuestionsBox>
    </Container>
  );
}
