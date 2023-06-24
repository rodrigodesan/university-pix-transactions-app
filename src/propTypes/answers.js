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
