import { Component } from 'react';
import css from './Searchbar.module.css';
import { HiSearch } from 'react-icons/hi';

export class Searchbar extends Component {
  state = {
    error: null,
    query: '',
  };

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>
              <HiSearch style={{ width: '25px', height: '25px' }} />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onInput={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
