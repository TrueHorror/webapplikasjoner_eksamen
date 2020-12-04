import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateUniqueID } from 'web-vitals/dist/lib/generateUniqueID';
import {
  StyledBanner,
  StyledFilterButton,
  StyledMainContent,
  StyledButtonGroupArticles,
  StyledArticleListItem,
  StyledArticleListItemImage,
  StyledArticleListItemContent,
  StyledArticleListItemContentHeader,
  StyledArticleListItemContentText,
  StyledArticleListItemContentHeaderCategory,
  StyledInput,
} from '../styles/Styled';

import { userIsLoggedInAsAdmin } from '../utils/authentication';
import { getArticlesRequest } from '../utils/apiCalls';

function Articles() {
  const articles = useSelector((state) => state.articles);
  const [filteredArticles, setFilteredArticles] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getArticlesRequest()
      .then((res) => {
        setFilteredArticles(articles);
        dispatch({
          type: 'SAVE_ARTICLES_IN_STORE',
          articles: res.data.articles,
        });
      })
      .catch((e) => {
        console.log(e);
        console.error('Noe gikk galt');
      });
  }, []);

  const articlesList = filteredArticles.map((article) => (
    <StyledArticleListItem key={generateUniqueID()}>
      <StyledArticleListItemImage />
      <StyledArticleListItemContent>
        <StyledArticleListItemContentHeader>
          <Link
            to={{ pathname: `/article/${article._id}` }}
            style={{ fontSize: '50px', textDecoration: 'none', color: 'black' }}
          >
            {article.Title}
          </Link>
          <StyledArticleListItemContentHeaderCategory>
            {article.Category.Name}
          </StyledArticleListItemContentHeaderCategory>
        </StyledArticleListItemContentHeader>
        <StyledArticleListItemContentText>
          {article.Content}
        </StyledArticleListItemContentText>
      </StyledArticleListItemContent>
    </StyledArticleListItem>
  ));

  const NewArticleButton = () => {
    if (userIsLoggedInAsAdmin()) {
      return <StyledFilterButton>NY ARTIKKEL</StyledFilterButton>;
    }
    return null;
  };

  const searchList = (evt) => {
    console.log(evt.target.value);
    setSearchString(evt.target.value);
    const rx = new RegExp(evt.target.value, 'i');
    const filtered = articles.filter((article) => {
      console.log(rx.test(article.Title));
      return rx.test(article.Title);
    });
    setFilteredArticles(filtered);
  };

  // eslint-disable-next-line no-undef
  /* const FilterOnCategory = categories.map((category) => (
    <option value={category._id}>{category.Name}</option>
  )); */

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
              onChange={searchList}
              defaultValue={searchString}
              type="text"
              style={{ marginRight: '10px' }}
            />
          </div>
        </StyledButtonGroupArticles>
        <div>{articlesList}</div>
      </StyledMainContent>
    </section>
  );
}

export default Articles;
