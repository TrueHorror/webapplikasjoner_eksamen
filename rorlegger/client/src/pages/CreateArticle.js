/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  StyledBanner,
  StyledMainContent,
  StyledLogin,
  StyledInput,
  StyledInputWrapper,
  StyledButton,
  StyledLabel,
  StyledForm,
  StyledSelect,
  StyledTextArea,
} from '../styles/Styled';
import { createArticleRequest, getCategories } from '../utils/apiCalls';
import { successToaster } from '../utils/global';

function CreateArticle({ handleOverlay }) {
  const [formData, setFormData] = useState({
    Title: '',
    Ingress: '',
    SubHeader: '',
    Content: '',
    Category: {},
    Writer: {
      GivenName: '',
      FamilyName: '',
    },
  });

  const [categories, setCategories] = useState([]);
  const [categoryOption, setCategoryOption] = useState('');
  const [writerLabelOption, setWriterLabelOption] = useState('');

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((e) => {
        console.log(e);
        console.error('Noe gikk galt');
      });
  }, []);

  async function createAttempt() {
    const dataBody = formData;

    try {
      await createArticleRequest(dataBody);
      successToaster('Artikkel laget');
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log('Noe gikk galt med lagringen');
      } else {
        console.log(e);
      }
    }
  }

  const categorySelect = (e) => {
    setCategoryOption(e.target.value);
  };

  const writerLabelSelect = (e) => {
    setWriterLabelOption(e.target.value);
  };

  const openModalForNewCategory = (e) => {
    e.preventDefault();
    handleOverlay();
    // code...
  };

  console.log(categories);

  return (
    <section>
      <StyledBanner>
        <h1>Ny artikkel</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledForm>
          <StyledLabel htmlFor="Title">Tittel:</StyledLabel>
          <StyledInput name="Title" placeholder="Tittel..." />
          <StyledLabel htmlFor="Ingress">Ingress:</StyledLabel>
          <StyledInput name="Ingress" placeholder="Ingress..." />
          <StyledLabel htmlFor="SubHeader">Under tittel:</StyledLabel>
          <StyledInput name="SubHeader" placeholder="SubHeader..." />
          <StyledLabel htmlFor="Content">Innhold:</StyledLabel>
          <StyledTextArea name="Content" placeholder="Content..." />
          <StyledLabel htmlFor="Category">Kategori:</StyledLabel>
          <div>
            <StyledSelect
              readOnly
              name="Category"
              value={categoryOption}
              onChange={categorySelect}
              placeholder="Kategori..."
            >
              {categories.map((cat) => (
                <option label={cat.Name} value={cat.Name} />
              ))}
            </StyledSelect>
            <StyledButton onClick={openModalForNewCategory}>
              Ny Kategori
            </StyledButton>
          </div>
          <StyledSelect
            readOnly
            name="WriterLabel"
            value={writerLabelOption}
            onChange={writerLabelSelect}
            placeholder="Forfatter tittel..."
          >
            <option>Admin: </option>
          </StyledSelect>
          <StyledLabel htmlFor="Writer">Forfatter:</StyledLabel>
          <StyledInput name="Writer" placeholder="Forfatter..." />

          <StyledButton>Create</StyledButton>
        </StyledForm>
      </StyledMainContent>
    </section>
  );
}

export default CreateArticle;
