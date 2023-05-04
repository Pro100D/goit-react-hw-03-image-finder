import PropTypes from 'prop-types';

export const Modal = ({ src, alt, handleClose }) => {
  return (
    <div className="Overlay" onClick={handleClose}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
