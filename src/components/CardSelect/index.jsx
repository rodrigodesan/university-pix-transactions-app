import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { CardBody } from './styled';

export default function CardSelect({
  items,
  setValue,
  setText,
  titleText,
  defaultText,
  results,
}) {
  return (
    <Card>
      <Card.Header className="d-flex flex-wrap justify-content-between align-items-center">
        {titleText}
        <div className="col-lg-5">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => {
              setValue(e.target.value);
              if (setText) {
                setText(
                  items.filter((item) => item.value === e.target.value)[0].text
                );
              }
            }}
          >
            <option disabled value="select">
              {defaultText}
            </option>
            {items &&
              items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.text}
                </option>
              ))}
          </select>
        </div>
      </Card.Header>
      <CardBody>{results}</CardBody>
    </Card>
  );
}

CardSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  setValue: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  titleText: PropTypes.string.isRequired,
  defaultText: PropTypes.string,
  results: PropTypes.string,
};

CardSelect.defaultProps = {
  defaultText: 'Selecione...',
  results: '',
};
