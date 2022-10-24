import { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.code === 'Escape') {
      this.props.closeModal();
      console.log('click');
    }
  }

  handleBackdropClick = event => {
    if (event.target.nodeName === 'DIV') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
