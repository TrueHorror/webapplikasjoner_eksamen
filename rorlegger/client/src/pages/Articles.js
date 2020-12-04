import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
} from '../styles/Styled';

import { userIsLoggedInAsAdmin } from '../utils/authentication';
import { getArticlesRequest } from '../utils/apiCalls';

function Articles() {
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getArticlesRequest()
      .then((res) => {
        setArticles(res.data.articles);
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

  const articlesList = articles.map((article) => (
    <StyledArticleListItem>
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
            <StyledFilterButton style={{ marginRight: '10px' }}>
              SØK
            </StyledFilterButton>
            <StyledFilterButton>FILTER</StyledFilterButton>
          </div>
        </StyledButtonGroupArticles>
        <div>{articlesList}</div>
      </StyledMainContent>
    </section>
  );
}

export default Articles;
