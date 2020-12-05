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
import { getArticlesRequest } from '../utils/apiCalls';

function Articles() {
  const articles = useSelector((state) => state.articles);
  const [filteredArticles, setFilteredArticles] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getArticlesRequest();
        dispatch({
          type: 'SAVE_ARTICLES_IN_STORE',
          articles: res.data.articles,
        });
        setFilteredArticles(res.data.articles);
      } catch (e) {
        console.log(e);
        console.error('Noe gikk galt');
      }
    };
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
                {article.Category.Name}
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

  const searchList = (evt) => {
    setSearchString(evt.target.value);
    const rx = new RegExp(evt.target.value, 'i');
    const filtered = articles.filter((article) => rx.test(article.Title));
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
        <div>
          <ArticlesList />
        </div>
      </StyledMainContent>
    </section>
  );
}

export default Articles;
