import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CardSelect from '../CardSelect';
import Question5 from '../Question5';
import { capitalizeWords } from '../../utils/dataTreatment';
import { yearTypes, regionTypes, stateTypes } from '../../propTypes/api';

const avgs = [];
for (let i = 1; i <= 10; i++) {
  const value = i * 1000000000;
  avgs.push({
    value: String(value),
    text: String(new Intl.NumberFormat('pt-BR').format(value)),
  });
}

export default function QuestionParams({
  questionParams,
  setParamList,
  years,
  states,
  regions,
}) {
  const [paramsConfig, setParamsConfig] = useState([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');
  const [avg, setAvg] = useState('');
  let divClass;
  switch (questionParams.length) {
    case 2:
      divClass = 'col-lg-6';
      break;
    case 3:
      divClass = 'col-lg-4';
      break;
    default:
      divClass = 'col-lg-8';
      break;
  }

  useEffect(() => {
    const formatYears = years.map((year) => {
      return { value: String(year.id), text: String(year.year) };
    });
    const formatStates = states.map((stateItem) => {
      return {
        value: String(stateItem.id),
        text: capitalizeWords(stateItem.name),
      };
    });
    const formatRegions = regions.map((regionItem) => {
      return {
        value: String(regionItem.id),
        text: capitalizeWords(regionItem.name),
      };
    });
    const configList = questionParams.map((param) => {
      let items;
      let title;
      let resultText;
      let setText;
      const id = param;
      switch (param) {
        case 'startYear':
          items = formatYears;
          title = 'Ano inicial';
          resultText = startYear;
          setText = setStartYear;
          break;
        case 'endYear':
          items = formatYears;
          title = 'Ano final';
          resultText = endYear;
          setText = setEndYear;
          break;
        case 'state':
          items = formatStates;
          title = 'Estado';
          resultText = state;
          setText = setState;
          break;
        case 'region':
          items = formatRegions;
          title = 'Região';
          resultText = region;
          setText = setRegion;
          break;
        case 'minAvg':
          items = avgs;
          title = 'Valor Mínimo';
          resultText = avg;
          setText = setAvg;
          break;
        default:
          items = [];
          title = '';
          resultText = '';
      }
      return {
        items,
        title,
        resultText,
        setText,
        id,
      };
    });
    setParamsConfig(configList);
  }, [
    questionParams,
    startYear,
    endYear,
    state,
    region,
    avg,
    years,
    states,
    regions,
  ]);
  return (
    <>
      {!questionParams.includes('selectedMonths') ? (
        paramsConfig.map((param, index) => (
          <div className={`${divClass} mb-3`} key={param.id}>
            <CardSelect
              items={param.items}
              setValue={setParamList[index]}
              titleText={param.title}
              results={param.resultText}
              setText={param.setText}
            />
          </div>
        ))
      ) : (
        <div className="col-lg-8">
          <Question5 years={years} setParamList={setParamList} />
        </div>
      )}
    </>
  );
}

QuestionParams.propTypes = {
  questionParams: PropTypes.arrayOf(PropTypes.string).isRequired,
  setParamList: PropTypes.arrayOf(PropTypes.func).isRequired,
  years: PropTypes.arrayOf(yearTypes).isRequired,
  states: PropTypes.arrayOf(stateTypes).isRequired,
  regions: PropTypes.arrayOf(regionTypes).isRequired,
};
