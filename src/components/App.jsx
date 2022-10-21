import { Component } from 'react';
import axios from 'axios';
import css from 'components/App.modules.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    gallery: [],
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        '?key=29521336-a1469f4927f87a0f3197cf310&q=yellow+flowers&image_type=photo'
      );
      this.setState({ gallery: response.data.hits });
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div className={css.App}>
        {error && <h2>{error}</h2>}
        <ul className={css.ImageGallery}>
          {this.state.gallery.map(image => {
            return (
              <li className={css.ImageGalleryItem} key={image.id}>
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className={css.ImageGalleryItemImage}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
