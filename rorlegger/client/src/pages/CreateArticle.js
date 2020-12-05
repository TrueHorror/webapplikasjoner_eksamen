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
    Writer: {},
  });

  const [categories, setCategories] = useState([]);
  const [categoryOption, setCategoryOption] = useState('');
  const [writerLabelOption, setWriterLabelOption] = useState('');
  const [writerName, setWriterName] = useState({
    GivenName: '',
    FamilyName: '',
  });

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

  // TODO: Se på apicalls med createArticleRequest. 400 error... response [Object object]?
  async function createAttempt(event) {
    event.preventDefault();
    setFormData({ ...formData, Writer: writerName });
    const dataBody = formData;

    try {
      await createArticleRequest(dataBody);
      successToaster('Artikkel laget');
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log(`Noe gikk galt med lagringen${e.response}`);
      } else {
        console.log(e);
      }
    }
  }

  const updateValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

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
  const updateWriterName = (e) => {
    const fullName = e.target.value.split(' ');
    const givenName = fullName[0];
    const familyName = fullName[1];
    setWriterName({
      GivenName: givenName,
      FamilyName: familyName,
    });
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
          <StyledInput
            value={formData.Title}
            name="Title"
            onChange={updateValue}
            placeholder="Tittel..."
          />
          <StyledLabel htmlFor="Ingress">Ingress:</StyledLabel>
          <StyledInput
            value={formData.Ingress}
            name="Ingress"
            onChange={updateValue}
            placeholder="Ingress..."
          />
          <StyledLabel htmlFor="SubHeader">Under tittel:</StyledLabel>
          <StyledInput
            value={formData.SubHead}
            name="SubHeader"
            onChange={updateValue}
            placeholder="SubHeader..."
          />
          <StyledLabel htmlFor="Content">Innhold:</StyledLabel>
          <StyledTextArea
            value={formData.Content}
            name="Content"
            onChange={updateValue}
            placeholder="Content..."
          />
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
          <StyledInput
            name="Writer"
            onChange={updateWriterName}
            placeholder="Forfatter..."
          />

          <StyledButton onClick={createAttempt}>Create</StyledButton>
        </StyledForm>
      </StyledMainContent>
    </section>
  );
}

export default CreateArticle;
