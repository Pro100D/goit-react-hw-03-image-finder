import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.handleClose();
    }
  };

  handleClickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.handleClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <div className="Overlay" onClick={this.handleClickOnBackdrop}>
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
