import { ImageGallaryItem } from '../imageGallaryItem/ImageGallaryItem';
import PropTypes from 'prop-types';

export const Gallary = ({ arrayImage, onImgClick }) => {
  return (
    <ul className="ImageGallery">
      {arrayImage.map(image => (
        <ImageGallaryItem image={image} key={image.id} onClick={onImgClick} />
      ))}
    </ul>
  );
};

Gallary.propTypes = {
  arrayImage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onImgClick: PropTypes.func.isRequired,
};
