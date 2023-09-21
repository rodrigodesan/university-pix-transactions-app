import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { capitalizeWords, translateMonth } from '../../utils/dataTreatment';

export default function ShowResults({ question, results }) {
  switch (question) {
    case 'question1':
    case 'question2':
      return (
        <p className="col-md-4 col-lg-6">
          <span className="fw-bold">Estado: </span>
          {capitalizeWords(results.state)}
          <br /> <span className="fw-bold">Média: </span>
          {results.average.toFixed(2)}
        </p>
      );
    case 'question3':
      return (
        <p className="col-md-4 col-lg-6">
          <span className="fw-bold">Região: </span>
          {capitalizeWords(results.region)}
          <br /> <span className="fw-bold">Média: </span>
          {results.average.toFixed(2)}
        </p>
      );
    case 'question4':
      return (
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Sigla</th>
              <th scope="col">Região</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.acronym}>
                <th scope="row">{item.acronym}</th>
                <td>{capitalizeWords(item.region)}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR').format(item.pix_number)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    case 'question5':
      return (
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.city_code}>
                <td>{capitalizeWords(item.city)}</td>
                <td>{capitalizeWords(item.state)}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR').format(item.pix_individual)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    case 'question6':
      return (
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">Média</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.city_code}>
                <td>{capitalizeWords(item.city)}</td>
                <td>{capitalizeWords(item.state)}</td>
                <td>{Number(item.average).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    case 'question7':
    case 'question8':
      return (
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">Diferença</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.city_code}>
                <td>{capitalizeWords(item.city)}</td>
                <td>{capitalizeWords(item.state)}</td>
                <td>{Number(item.dif_rec_pay).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    case 'question9':
      return (
        <p className="col-md-4 col-lg-6">
          <span className="fw-bold">Mês: </span>
          {translateMonth(results.month)}
          <br /> <span className="fw-bold">Total: </span>
          {new Intl.NumberFormat('pt-BR').format(results.trans_total)}
        </p>
      );
    case 'question10':
      return (
        <p className="col-md-4 col-lg-8">
          <span className="fw-bold">Total: </span>
          {new Intl.NumberFormat('pt-BR').format(results.trans_total)}
          <br /> <span className="fw-bold">Mês: </span>
          {translateMonth(results.month)}
          <br /> <span className="fw-bold">Ano: </span>
          {results.year}
          <br /> <span className="fw-bold">Cidade: </span>
          {capitalizeWords(results.city)}
          <br /> <span className="fw-bold">Estado: </span>
          {capitalizeWords(results.state)}
        </p>
      );
    default:
      return <></>;
  }
}

ShowResults.propTypes = {
  question: PropTypes.string.isRequired,
  results: PropTypes.shape({}) || PropTypes.arrayOf(PropTypes.shape({})),
};

ShowResults.defaultProps = {
  results: '',
};
