import React from 'react';
import {
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledMaterialIcon,
  StyledOverlay,
  StyledOverlayForm,
} from '../styles/Styled';
import { addImageToArticleRequest } from '../utils/apiCalls';
import {
  commonErrorHandler,
  errorToaster,
  successToaster,
} from '../utils/global';

function UploadImageToArticleModal(props) {
  // eslint-disable-next-line react/prop-types,no-unused-vars
  const { articleId, closeModal } = props;

  const uploadImage = async () => {
    const image = document.querySelector('#image-input').files[0];
    const data = new FormData();
    data.append('image', image);
    console.log(image);
    console.log(image.type);
    if (image.type === 'image/png' || image.type === 'image/jpeg') {
      try {
        await addImageToArticleRequest(articleId, data);
        successToaster('Bilde lastet opp');
        window.location.reload();
      } catch (e) {
        if (!commonErrorHandler()) {
          console.error(e);
          errorToaster('Fikk ikke lastet opp bilde');
        }
      }
    } else {
      errorToaster('Kun .jpg og .png er tillatte filtyper');
    }
  };

  return (
    <StyledOverlay>
      <StyledOverlayForm action="" method="post" enctype="multipart/form-data">
        <StyledMaterialIcon className="material-icons" onClick={closeModal}>
          clear
        </StyledMaterialIcon>
        <StyledLabel>Velg bilde: </StyledLabel>
        <StyledInput id="image-input" type="file" name="image" />
        <StyledButton type="button" onClick={uploadImage}>
          Lagre bilde
        </StyledButton>
      </StyledOverlayForm>
    </StyledOverlay>
  );
}
export default UploadImageToArticleModal;
