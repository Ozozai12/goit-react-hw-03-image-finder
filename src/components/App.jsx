import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import css from 'components/App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    gallery: [],
    error: null,
    query: '',
    page: 1,
    showModal: false,
    modalImage: '',
    totalHits: null,
    status: 'idle',
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  searchQuery = searchWord => {
    this.setState({ query: searchWord, gallery: [], page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async searchOnWord() {
    try {
      const response = await axios.get(
        `?key=29521336-a1469f4927f87a0f3197cf310&q=${this.state.query}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
      );
      this.setState(prevState => ({
        gallery: prevState.gallery.concat(response.data.hits),
        totalHits: response.data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong, please reboot the page' });
    } finally {
      this.setState({ status: 'idle' });
    }
  }

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: 'pending' });
      this.searchOnWord();
    }
    if (prevState.status !== 'pending') {
      const { height: cardHeight } = document
        .querySelector('#root')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 10,
        behavior: 'smooth',
      });
    }
  };

  onImageClick = event => {
    const openImage = this.state.gallery.find(
      image => image.webformatURL === event.currentTarget.src
    ).largeImageURL;

    this.setState({
      modalImage: openImage,
      showModal: true,
    });
  };

  render() {
    const { error, gallery, modalImage, totalHits, status } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.searchQuery} />
        {error && <h2 className={css.Error}>{error}</h2>}

        <ImageGallery photos={gallery} onClick={this.onImageClick} />

        {status !== 'pending' &&
          gallery.length > 0 &&
          gallery.length !== totalHits && <Button onClick={this.loadMore} />}
        {this.state.showModal && (
          <Modal modalImage={modalImage} closeModal={this.toggleModal} />
        )}
        {status === 'pending' && (
          <div className={css.Loader}>
            <ThreeDots height="80" width="80" radius="9" color="#3f51b5" />
          </div>
        )}
      </div>
    );
  }
}
