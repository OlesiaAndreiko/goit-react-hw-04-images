import PropTypes from 'prop-types';
import { Overlay, ThumbImage, ModalImage } from './Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ onClose, largeImageURL, tags }) => {
  
  const onBackdropClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [onClose]);

  return (
    <Overlay>
      <ThumbImage>
        <ModalImage src={largeImageURL} alt={tags} onClick={onBackdropClose}/>
      </ThumbImage>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};


