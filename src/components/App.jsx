import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import css from 'components/App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    gallery: [],
    error: null,
    query: '',
    page: 1,
    showModal: false,
    modalImage: '',
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
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong, please reboot the page' });
    }
  }

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.searchOnWord();
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div className={css.App}>
        {this.state.showModal && (
          <Modal
            modalImage={this.state.modalImage}
            closeModal={this.toggleModal}
          />
        )}
        <Searchbar onSubmit={this.searchQuery} />
        {error && <h2>{error}</h2>}

        <ImageGallery photos={this.state.gallery} onClick={this.toggleModal} />

        {this.state.gallery.length > 0 && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}
