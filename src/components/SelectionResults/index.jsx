import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import QuestionParams from '../QuestionParams';
import SearchResult from '../SearchResults';
import { yearTypes, regionTypes, stateTypes } from '../../propTypes/api';

export default function SelectionResults({
  question,
  questionParams,
  years,
  states,
  regions,
}) {
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [param3, setParam3] = useState('');
  const [selectParams, setSelectParams] = useState([]);

  useEffect(() => {
    const newParams = [];
    if (param1) newParams.push(param1);
    if (param2) newParams.push(param2);
    if (param3) newParams.push(param3);
    setSelectParams(newParams);
  }, [param1, param2, param3]);

  return (
    <>
      <QuestionParams
        questionParams={questionParams}
        setParamList={[setParam1, setParam2, setParam3]}
        years={years}
        states={states}
        regions={regions}
      />
      <SearchResult
        question={question}
        questionParams={questionParams}
        selectParams={selectParams}
      />
    </>
  );
}

SelectionResults.propTypes = {
  questionParams: PropTypes.arrayOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  years: PropTypes.arrayOf(yearTypes).isRequired,
  states: PropTypes.arrayOf(stateTypes).isRequired,
  regions: PropTypes.arrayOf(regionTypes).isRequired,
};
