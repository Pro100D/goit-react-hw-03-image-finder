import { Component } from 'react';
import { SearchBar } from './searchBar/SearchBar';
import { Gallary } from './imageGallary/ImageGallery';
import { Button } from './LoadMoreBtn/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { fetchImages } from '../services/pixabay-Api';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    isLoad: false,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  handleClickMore = async () => {
    const response = await fetchImages(
      this.state.searchValue,
      this.state.page + 1
    );
    this.setState({
      images: [...this.state.images, ...response],
      page: this.state.page + 1,
    });
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalImg: e.target.name,
      modalAlt: e.target.alt,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  handleSubmit = async value => {
    if (value === this.state.searchValue) {
      return;
    }

    this.setState({ isLoad: true });
    const response = await fetchImages(value, 1);
    this.setState({
      images: response,
      searchValue: value,
      isLoad: false,
      pageNr: 1,
    });
    this.setState({ searchValue: value });
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { images, modalOpen, isLoad, modalImg, modalAlt } = this.state;

    return (
      <>
        {isLoad ? (
          <Loader />
        ) : (
          <>
            <SearchBar onSubmit={this.handleSubmit} />
            <Gallary arrayImage={images} onImgClick={this.handleImageClick} />
            {images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </>
        )}
        {modalOpen && (
          <Modal
            src={modalImg}
            alt={modalAlt}
            handleClose={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}
