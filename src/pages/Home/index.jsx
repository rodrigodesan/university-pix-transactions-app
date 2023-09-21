import { useState, useCallback, useEffect, useRef } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import { useApi } from '../../hooks/useApi';

import { Container } from '../../styles/GlobalStyles';
import { QuestionsBox, Loader } from './styled';

import CardSelect from '../../components/CardSelect';

import { questionsOptions, questionsParams } from './helpers';
import SelectionResults from '../../components/SelectionResults';

export default function Home() {
  const [years, setYears] = useState([]);
  const [states, setStates] = useState([]);
  const [regions, setRegions] = useState([]);
  const [question, setQuestion] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionParams, setQuestionParams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getYears, getStates, getRegions } = useApi();

  const getYearsRef = useRef(getYears);
  const getStatesRef = useRef(getStates);
  const getRegionsRef = useRef(getRegions);

  const loadData = useCallback(async (method, stateFunction) => {
    setIsLoading(true);
    try {
      const { data, status } = await method();
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
    loadData(getYearsRef.current, setYears);
    loadData(getStatesRef.current, setStates);
    loadData(getRegionsRef.current, setRegions);
  }, [loadData]);

  useEffect(() => {
    if (question) {
      setQuestionParams(questionsParams[question] ?? []);
    }
  }, [question]);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <h1 className="text-center h2 mb-4">Consultas de dados</h1>
      <QuestionsBox>
        <div className="row justify-content-center">
          <div className="col-12 mb-3">
            <CardSelect
              items={questionsOptions}
              setValue={setQuestion}
              setText={setQuestionText}
              titleText="Pergunta da Busca"
              defaultText="Selecione a pergunta"
              results={questionText}
            />
          </div>
          <SelectionResults
            key={question}
            question={question}
            questionParams={questionParams}
            years={years}
            states={states}
            regions={regions}
          />
        </div>
      </QuestionsBox>
    </Container>
  );
}
