import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ photos, onClick }) => {
  return photos.map(image => {
    return (
      <li className={css.ImageGalleryItem} key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={css.ImageGalleryItemImage}
          onClick={onClick}
        />
      </li>
    );
  });
};
