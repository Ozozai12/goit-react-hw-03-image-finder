import React from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem photos={photos} onClick={onClick} />
    </ul>
  );
};
