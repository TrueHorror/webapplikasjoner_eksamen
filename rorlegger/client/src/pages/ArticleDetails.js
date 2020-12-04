import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  StyledArticleContentDetails,
  StyledArticleContentDetailsDate,
  StyledArticleContentDetailsWriter,
  StyledBanner,
  StyledMainContent,
} from '../styles/Styled';
// import {getArticlesRequest} from '../utils/apiCalls';

function ArticleDetails() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const articles = useSelector((state) => state.articles);
  const [article, setArticle] = useState({});

  useEffect(() => {
    let foundArticle;
    if (articles) {
      foundArticle = articles.find((oneArticle) => oneArticle._id === id);
    }
    if (foundArticle) {
      foundArticle.Writer = `${foundArticle.Writer.GivenName} ${foundArticle.Writer.FamilyName}`;
      setArticle(foundArticle);
    }
  }, []);

  return (
    <section>
      <StyledBanner>
        <h1>{article.Title}</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledArticleContentDetails>
          <StyledArticleContentDetailsWriter>
            Av {article.Writer}
          </StyledArticleContentDetailsWriter>
          <StyledArticleContentDetailsDate>
            dato
          </StyledArticleContentDetailsDate>
        </StyledArticleContentDetails>
        <p>{article.Content}</p>
      </StyledMainContent>
    </section>
  );
}

export default ArticleDetails;
