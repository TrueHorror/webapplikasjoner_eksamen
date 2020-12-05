import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateUniqueID } from 'web-vitals/dist/lib/generateUniqueID';
import {
  StyledBanner,
  StyledMainContent,
  StyledButtonGroupArticles,
  StyledArticleListItem,
  StyledArticleListItemImage,
  StyledArticleListItemContent,
  StyledArticleListItemContentHeader,
  StyledArticleListItemContentText,
  StyledArticleListItemContentHeaderCategory,
  StyledInput,
  StyledLinkButton,
} from '../styles/Styled';

import { userIsLoggedInAsAdmin } from '../utils/authentication';
import { getArticlesRequest, getCategoriesRequest } from '../utils/apiCalls';
import { errorToaster } from '../utils/global';

function Articles() {
  const articles = useSelector((state) => state.articles);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await getArticlesRequest();
      dispatch({
        type: 'SAVE_ARTICLES_IN_STORE',
        articles: res.data.articles,
      });
      setFilteredArticles(res.data.articles);
      const catRes = await getCategoriesRequest();
      setCategories(Object.assign(catRes.data.categories));
    } catch (e) {
      errorToaster('Noe gikk galt under henting av data');
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ArticlesList = () => {
    if (filteredArticles && filteredArticles.length > 0) {
      return filteredArticles.map((article) => (
        <StyledArticleListItem key={generateUniqueID()}>
          <StyledArticleListItemImage />
          <StyledArticleListItemContent>
            <StyledArticleListItemContentHeader>
              <Link
                to={{ pathname: `/article/${article._id}` }}
                style={{
                  fontSize: '50px',
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                {article.Title}
              </Link>
              <StyledArticleListItemContentHeaderCategory>
                {article.Category ? article.Category.Name : 'Kategori mangler'}
              </StyledArticleListItemContentHeaderCategory>
            </StyledArticleListItemContentHeader>
            <StyledArticleListItemContentText>
              {article.Content}
            </StyledArticleListItemContentText>
          </StyledArticleListItemContent>
        </StyledArticleListItem>
      ));
    }
    return null;
  };

  const NewArticleButton = () => {
    if (userIsLoggedInAsAdmin()) {
      return (
        <StyledLinkButton to={{ pathname: `/createarticle` }}>
          NY ARTIKKEL
        </StyledLinkButton>
      );
    }
    return null;
  };

  const updateSearchString = (evt) => {
    setSearchString(evt.target.value);
  };

  const FilterOnCategoryList = () => {
    if (categories && categories.length > 0) {
      return categories.map((category) => (
        <option value={category._id}>{category.Name}</option>
      ));
    } else {
      return null;
    }
  };

  const updateChosenCategory = (evt) => {
    setChosenCategory(evt.target.value);
  };

  const filterOnSearchAndCategory = () => {
    const filteredOnCategory = articles.filter(
      (article) => article.Category._id === chosenCategory
    );
    const searchRx = new RegExp(searchString, 'i');
    const filtered = filteredOnCategory.filter((article) =>
      searchRx.test(article.Title)
    );
    setFilteredArticles(filtered);
  };

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    filterOnSearchAndCategory();
  }, [chosenCategory, searchString]);

  return (
    <section>
      <StyledBanner>
        <h1>Fagartikler</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledButtonGroupArticles>
          <div>
            <NewArticleButton />
          </div>
          <div>
            <StyledInput
              id="search-input"
              onChange={updateSearchString}
              defaultValue={searchString}
              type="text"
              style={{ marginRight: '10px' }}
              placeholder="søk"
            />
            <select onChange={updateChosenCategory} value={chosenCategory}>
              <FilterOnCategoryList />
            </select>
          </div>
        </StyledButtonGroupArticles>
        <div>
          <ArticlesList />
        </div>
      </StyledMainContent>
    </section>
  );
}

export default Articles;
