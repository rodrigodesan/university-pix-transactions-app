import PropTypes from 'prop-types';

export const yearTypes = PropTypes.shape({
  id: PropTypes.number,
  year: PropTypes.number,
  YearMonths: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      month: PropTypes.string,
      month_num: PropTypes.number,
    })
  ),
});

export const stateTypes = PropTypes.shape({
  id: PropTypes.number,
  ibge_code: PropTypes.number,
  name: PropTypes.string,
  region: PropTypes.number,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ibge_code: PropTypes.number,
      name: PropTypes.string,
    })
  ),
});

export const regionTypes = PropTypes.shape({
  id: PropTypes.number,
  acronym: PropTypes.string,
  name: PropTypes.string,
  region: PropTypes.number,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ibge_code: PropTypes.number,
      name: PropTypes.string,
    })
  ),
});
