import { useState } from 'react';
import PropTypes from 'prop-types';

import { FormCheck, Card } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';

import { CardBody } from './styled';
import { translateMonth } from '../../utils/dataTreatment';

export default function Question5({ years, setParamList }) {
  const [months, setMonths] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [setParam1, setParam2] = setParamList;

  function handleSelectMonths(e) {
    const itemId = e.target.value;
    const currentMonths = [...selectedMonths];
    if (!currentMonths.includes(itemId)) {
      currentMonths.push(itemId);
    } else {
      const requirementIndex = currentMonths.indexOf(itemId);
      currentMonths.splice(requirementIndex, 1);
    }
    setSelectedMonths(currentMonths);
    setParam2(currentMonths);
  }

  return (
    <Card>
      <Card.Header className="d-flex flex-wrap justify-content-between align-items-center">
        Selecione o ano e os meses
        <div className="col-lg-5">
          <select
            defaultValue="select"
            className="form-select"
            onChange={(e) => {
              const yearId = Number(e.target.value);
              setParam1(yearId);
              const yearMonths = years.find((item) => item.id === yearId);
              setMonths(yearMonths.YearMonths);
              setSelectedMonths([]);
            }}
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
      </Card.Header>
      <CardBody className="flex-wrap">
        {months.map((month) => (
          <FormCheck className="form-check-inline" key={month.id}>
            <FormCheckInput
              type="checkbox"
              id={month.month_num}
              value={month.id}
              name="selectedMonths"
              checked={selectedMonths.includes(String(month.id))}
              onChange={handleSelectMonths}
            />
            <FormCheckLabel htmlFor={month.month_num}>
              {translateMonth(month.month)}
            </FormCheckLabel>
          </FormCheck>
        ))}
      </CardBody>
    </Card>
  );
}

Question5.propTypes = {
  setParamList: PropTypes.arrayOf(PropTypes.func).isRequired,
  years: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      year: PropTypes.number,
      YearMonths: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          month: PropTypes.string,
          month_num: PropTypes.number,
        })
      ),
    })
  ).isRequired,
};
