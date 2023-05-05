import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  state = {
    src: this.props.src,
    alt: this.props.alt,
    handleClose: this.props.handleClose,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModalOnkeyDown();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { src, handleClose, alt } = this.state;

    return (
      <div className="Overlay" onClick={handleClose}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
