import PropTypes from 'prop-types';
import { Overlay, ThumbImage, ModalImage } from './Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ onClose, largeImageURL, tags }) => {
  
  const onBackdropClose = event => {
    if (event.target === event.currentTarget) {
      console.log(event.target)
      console.log(event.currentTarget)
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
    <Overlay onClick={onBackdropClose}>
      <ThumbImage>
        <ModalImage src={largeImageURL} alt={tags}/>
      </ThumbImage>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};


