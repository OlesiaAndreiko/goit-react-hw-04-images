import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../../components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({image: { id, tags, webformatURL, largeImageURL }}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(isOpen => !isOpen);
  };

  return (
    <GalleryItem key={id} onClick={toggleModal}>
      <GalleryItemImage src={webformatURL} alt={tags} />
      {isOpenModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};
