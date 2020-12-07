/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import {
  createArticleRequest,
  getCategoriesRequest,
  getWriters,
} from '../utils/apiCalls';
import {
  successToaster,
  errorToaster,
  commonErrorHandler,
} from '../utils/global';

function CreateArticle({ handleOverlay }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    Title: '',
    Ingress: '',
    SubHeader: '',
    Content: '',
  });
  const [categories, setCategories] = useState([]);
  const [categoryOption, setCategoryOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();

  const [writers, setWriters] = useState([]);
  const [writerOption, setWriterOption] = useState('');
  const [writerNameArray, serWriterNameArray] = useState();
  const [selectedWriter, setSelectedWriter] = useState();

  const [allData, setAllData] = useState({});

  const [secret, setSecret] = useState(false);

  useEffect(() => {
    getCategoriesRequest()
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((e) => {
        console.log(e);
        errorToaster('Noe gikk galt under henting av kategorier');
      });
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    getWriters()
      .then((res) => {
        setWriters(res.data.Writers);
      })
      .catch((e) => {
        if (!commonErrorHandler(e)) {
          console.log(e);
          errorToaster('Noe gikk galt under henting av forfattere');
        }
      });
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    console.log('outside if');
    if (noEmptyInputs(e)) {
      console.log('inside if');
      updateAllDataValue();
    } else {
      errorToaster('Fyll i feltene med røde kanter');
    }
  };

  const updateAllDataValue = () => {
    setAllData(formData);
  };

  const updateValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModalForNewCategory = (e) => {
    e.preventDefault();
    handleOverlay();
  };

  const updateSecret = () => {
    setSecret((se) => !se);
  };

  useEffect(() => {
    setFormData({ ...formData, Secret: secret });
  }, [secret]);

  // Writer ---------------------------------

  const updateWriterOption = (e) => {
    const name = e.target.value.split(' ');
    serWriterNameArray(name);
    setWriterOption(e.target.value);
  };

  useEffect(() => {
    if (writerNameArray) {
      console.log('Updating selectedWriter');
      console.log(writerNameArray);
      setSelectedWriter({
        GivenName: writerNameArray[0],
        FamilyName: writerNameArray[1],
      });
    }
  }, [writerNameArray]);

  useEffect(() => {
    if (selectedWriter) {
      console.log('Adding selected writer to formData');
      setFormData({ ...formData, Writer: selectedWriter });
    }
  }, [selectedWriter]);

  // updating selected category and putting in formData----------

  const updateSelectedCategory = (e) => {
    setCategoryOption(e.target.value);
  };

  useEffect(() => {
    if (categoryOption) {
      console.log('Updating selectedCategory');
      const addCategoryOptionToSelectedCategory = () => {
        setSelectedCategory(categoryOption);
      };
      addCategoryOptionToSelectedCategory();
    }
  }, [categoryOption]);

  useEffect(() => {
    if (selectedCategory) {
      console.log('Adding category to formData');
      setFormData({ ...formData, Category: selectedCategory });
    }
  }, [selectedCategory]);

  //-------------------------------------------------------------

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // TODO: Se på apicalls med createArticleRequest. 400 error... response [Object object]?
  useEffect(() => {
    if (Object.keys(allData).length > 0) {
      console.log(allData);
      console.log('creating Article');
      const createAttempt = async (dataBody) => {
        try {
          await createArticleRequest(dataBody);
          successToaster('Artikkel laget');

          history.push('/articles');
        } catch (e) {
          if (!commonErrorHandler(e)) {
            if (e.response && e.response.status === 400) {
              console.log(`Noe gikk galt med lagringen${e.response}`);
            } else {
              console.log(e);
            }
          }
        }
      };
      createAttempt(allData);
    }
  }, [allData]);

  // Is inputs empty validations?
  const noEmptyInputs = (e) => {
    const inputs = e.target.querySelectorAll('input');
    const textarea = e.target.querySelectorAll('textarea');
    const selects = e.target.querySelectorAll('select');
    let errors = 0;
    inputs.forEach((i) => {
      if (i.value === '') {
        i.style.border = '2px solid #ff0000';
        errors++;
      } else {
        i.style.border = '1px solid #469fb9';
      }
    });

    textarea.forEach((t) => {
      if (t.value === '') {
        t.style.border = '2px solid #ff0000';
        errors++;
      } else {
        t.style.border = '1px solid #469fb9';
      }
    });

    selects.forEach((s) => {
      if (
        s.value === 'Velg en kategori...' ||
        s.value === 'Velg forfatter...'
      ) {
        s.style.border = '2px solid #ff0000';
        errors++;
      } else {
        s.style.border = '1px solid #469fb9';
      }
    });

    if (errors > 0) {
      return false;
    }

    return true;
  };

  return (
    <section>
      <StyledBanner>
        <h1>Ny artikkel</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledForm onSubmit={handleCreate}>
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
              onChange={updateSelectedCategory}
              placeholder="Kategori..."
            >
              <option>Velg en kategori...</option>
              {categories.map((cat) => (
                <option label={cat.Name} value={cat._id} />
              ))}
            </StyledSelect>
            <StyledButton onClick={openModalForNewCategory}>
              Ny Kategori
            </StyledButton>
          </div>

          <StyledLabel htmlFor="Writer">Forfatter:</StyledLabel>
          <StyledSelect
            readOnly
            name="Writer"
            value={writerOption}
            onChange={updateWriterOption}
            placeholder="Forfatter..."
          >
            <option>Velg forfatter...</option>
            {writers &&
              writers.map((w) => (
                <option
                  label={`${w.GivenName} ${w.FamilyName}`}
                  value={`${w.GivenName} ${w.FamilyName}`}
                />
              ))}
          </StyledSelect>
          <label style={{ float: 'right' }} htmlFor="secret">
            Hemmelig artikkel?
          </label>
          <StyledInput type="checkbox" name="secret" onChange={updateSecret} />

          <StyledButton type="submit">Create</StyledButton>
        </StyledForm>
      </StyledMainContent>
    </section>
  );
}

export default CreateArticle;
