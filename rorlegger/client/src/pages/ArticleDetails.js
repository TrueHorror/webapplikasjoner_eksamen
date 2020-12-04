import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  StyledArticleContentDetails,
  StyledArticleContentDetailsDate,
  StyledArticleContentDetailsWriter,
  StyledBanner,
  StyledGreenButton,
  StyledMainContent,
  StyledRedButton,
  StyledAdminButtons,
} from '../styles/Styled';
import { getArticlesRequest } from '../utils/apiCalls';
import { errorToaster } from '../utils/global';

function ArticleDetails() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const articles = useSelector((state) => state.articles);
  const user = useSelector((state) => state.loggedInUser);
  const [article, setArticle] = useState({});

  useEffect(async () => {
    let foundArticle;
    if (articles.length > 0) {
      foundArticle = articles.find((oneArticle) => oneArticle._id === id);
    } else {
      try {
        const tempArticles = await getArticlesRequest();
        setArticle(
          tempArticles.data.articles.find((oneArticle) => oneArticle._id === id)
        );
      } catch (e) {
        errorToaster('Artikkel ikke funnet');
      }
    }
    if (foundArticle) {
      setArticle(foundArticle);
    }
  }, []);

  const DateField = () => {
    if (article.Created) {
      const date = new Date(article.Created);
      return (
        <StyledArticleContentDetailsDate>
          {date.toLocaleDateString('no-NO')}
        </StyledArticleContentDetailsDate>
      );
    }
    return null;
  };

  const WriterField = () => {
    if (article.Writer && article.Writer.GivenName) {
      return (
        <StyledArticleContentDetailsWriter>
          Av {article.Writer.GivenName} {article.Writer.FamilyName}
        </StyledArticleContentDetailsWriter>
      );
    }
    return (
      <StyledArticleContentDetailsWriter>
        Av ukjent
      </StyledArticleContentDetailsWriter>
    );
  };

  const AdminButtons = () => {
    if (user.userType === 0 && article.Created) {
      return (
        <StyledAdminButtons>
          <StyledRedButton>SLETT</StyledRedButton>
          <StyledGreenButton>REDIGER</StyledGreenButton>
        </StyledAdminButtons>
      );
    }
    return null;
  };

  return (
    <section>
      <StyledBanner>
        <h1>{article.Title}</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledArticleContentDetails>
          <WriterField />
          <DateField />
        </StyledArticleContentDetails>
        <p>{article.Ingress}</p>
        <h2>{article.SubHeader}</h2>
        <p>{article.Content}</p>
        <AdminButtons />
      </StyledMainContent>
    </section>
  );
}

export default ArticleDetails;
