import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <button type="bytton" onClick={onClick} className="Button">
    Load More
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
