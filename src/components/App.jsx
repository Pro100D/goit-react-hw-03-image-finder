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

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({ isLoad: true });
      const response = await fetchImages(this.state.searchValue, 1);
      this.setState({
        images: response,
        searchValue: this.state.searchValue,
        isLoad: false,
        pageNr: 1,
      });
    }
  }

  handleSubmit = async value => {
    if (value === this.state.searchValue) {
      return;
    }

    this.setState({
      searchValue: value,

      images: [],
      page: 1,
      isLoad: false,
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  handleClickMore = async () => {
    const response = await fetchImages(
      this.state.searchValue,
      this.state.page + 1
    );
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...response],
        page: prevState.page + 1,
      };
    });
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalImg: e.target.name,
      modalAlt: e.target.alt,
    });
  };

  handleCloseModal = e => {
    if (e.currentTarget === e.target) {
      this.setState({
        modalOpen: false,
        modalImg: '',
        modalAlt: '',
      });
    }
  };
  handleKeydownCloseModal = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

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
            closeModalOnkeyDown={this.handleKeydownCloseModal}
          />
        )}
      </>
    );
  }
}
