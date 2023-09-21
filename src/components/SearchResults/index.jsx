import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useApi } from '../../hooks/useApi';
import ShowResults from '../ShowResults';
import { Button, Loader } from '../../styles/GlobalStyles';
import { CardBody } from './styled';

export default function SearchResults({
  question,
  questionParams,
  selectParams,
}) {
  const [results, setResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();

  const searchQuestion = async () => {
    setIsLoading(true);
    setResults('');
    try {
      const { data } = await api[question](
        selectParams[0],
        selectParams[1] && selectParams[1],
        selectParams[2] && selectParams[2]
      );
      if (!data) toast.error('Sem resultados para a busca');
      setResults(data);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 400 || status === 401)
        errors.map((error) => toast.error(error));
    }
    setIsLoading(false);
  };

  return (
    <div className="col-lg-12">
      <Button
        disabled={!question || selectParams.length !== questionParams.length}
        onClick={searchQuestion}
        className="mb-3"
      >
        <Loader isLoading={isLoading} />
        Buscar
      </Button>
      <Card>
        <Card.Header>Resultados</Card.Header>
        <CardBody>
          {results && <ShowResults question={question} results={results} />}
        </CardBody>
      </Card>
    </div>
  );
}

SearchResults.propTypes = {
  question: PropTypes.string.isRequired,
  questionParams: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectParams: PropTypes.arrayOf(PropTypes.string).isRequired,
};
