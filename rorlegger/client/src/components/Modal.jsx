/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  StyledOverlayForm,
  StyledInput,
  StyledMaterialIcon,
  StyledOverlay,
  StyledButton,
} from '../styles/Styled';
import { createCategory } from '../utils/apiCalls';

function Modal({ handleOverlay }) {
  const [newCategory, setNewCategory] = useState({
    Name: '',
  });

  async function createNewCategory() {
    const data = newCategory;
    try {
      await createCategory(data);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log('Noe gik galt');
      } else {
        console.log(e);
      }
    }
  }
  const updatenewCategory = (e) => {
    console.log(e.target.value);
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  return (
    <StyledOverlay>
      <StyledOverlayForm>
        <StyledMaterialIcon className="material-icons" onClick={handleOverlay}>
          clear
        </StyledMaterialIcon>
        <StyledInput name="Name" onChange={updatenewCategory} />
        <StyledButton onClick={createNewCategory}>Lagre kategori</StyledButton>
      </StyledOverlayForm>
    </StyledOverlay>
  );
}
export default Modal;
