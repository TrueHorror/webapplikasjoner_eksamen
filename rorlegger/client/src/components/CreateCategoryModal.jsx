/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  StyledOverlayForm,
  StyledInput,
  StyledMaterialIcon,
  StyledOverlay,
  StyledButton,
  StyledLabel,
} from '../styles/Styled';
import { createCategoryRequest } from '../utils/apiCalls';

function Modal({ handleOverlay }) {
  const [newCategory, setNewCategory] = useState();
  const [isEmpty, setIsEmpty] = useState(false);

  async function createNewCategory(event) {
    event.preventDefault();
    const catField = event.target.querySelector('input');
    if (!newCategory) {
      catField.style.border = '2px solid #ff0000';
      setIsEmpty(true);
    } else {
      catField.style.border = '1px solid #469fb9';
      setIsEmpty(false);
      handleOverlay();
      const data = newCategory;
      try {
        await createCategoryRequest(data);
      } catch (e) {
        if (e.response && e.response.status === 400) {
          console.log('Noe gik galt');
        } else {
          console.log(e);
        }
      }
    }
  }
  const updatenewCategory = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  return (
    <StyledOverlay>
      <StyledOverlayForm onSubmit={createNewCategory}>
        <StyledMaterialIcon className="material-icons" onClick={handleOverlay}>
          clear
        </StyledMaterialIcon>
        <StyledLabel>Ny kategori: </StyledLabel>
        {isEmpty && (
          <StyledLabel style={{ color: 'red' }}>Fyll i først</StyledLabel>
        )}
        <StyledInput name="Name" onChange={updatenewCategory} />
        <StyledButton type="submit">Lagre kategori</StyledButton>
      </StyledOverlayForm>
    </StyledOverlay>
  );
}
export default Modal;
