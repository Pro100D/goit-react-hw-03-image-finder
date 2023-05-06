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
    showBtn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page, images } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ isLoad: true });
      try {
        const response = await fetchImages(searchValue, page);

        this.setState({
          images: [...images, ...response.hits],

          showBtn: this.state.page < Math.ceil(response.totalHits / 12),
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({
          isLoad: false,
        });
      }
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
    this.setState(prevState => {
      return {
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

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  render() {
    const { images, modalOpen, isLoad, modalImg, modalAlt, showBtn } =
      this.state;

    return (
      <>
        {isLoad && <Loader />}

        <SearchBar onSubmit={this.handleSubmit} />
        <Gallary arrayImage={images} onImgClick={this.handleImageClick} />
        {showBtn && <Button onClick={this.handleClickMore} />}

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
