import PropTypes from 'prop-types';

export const ImageGallaryItem = ({ image, onClick }) => (
  <li className="ImageGalleryItem" onClick={onClick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className="ImageGalleryItem-image"
    />
  </li>
);
ImageGallaryItem.propTypes = {
  image: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};
