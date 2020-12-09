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
  StyledArticleHeader,
} from '../styles/Styled';
import {
  getNonSecretArticleRequest,
  getSecretArticleRequest,
} from '../utils/apiCalls';
import { commonErrorHandler, errorToaster } from '../utils/global';
import UploadImageToArticleModal from '../components/UploadImageToArticleModal';

function ArticleDetails() {
  const { id } = useParams();
  const user = useSelector((state) => state.loggedInUser);
  const [article, setArticle] = useState({});
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);

  useEffect(async () => {
    let res;
    try {
      if (user.email) {
        res = await getSecretArticleRequest(id);
      } else {
        res = await getNonSecretArticleRequest(id);
      }
      console.log(res);
      setArticle(res.data.article);
    } catch (e) {
      if (!commonErrorHandler(e)) {
        if (e.response && e.response.status === 404) {
          errorToaster('Artikkel ikke funnet');
        } else {
          errorToaster('Noe gikk galt');
        }
      }
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

  const showUploadImageModal = () => {
    setShowImageUploadModal(true);
  };

  const closeModal = () => {
    setShowImageUploadModal(false);
  };

  const AdminButtons = () => {
    if (user.userType === 0 && article.Created) {
      return (
        <StyledAdminButtons>
          <StyledRedButton>SLETT</StyledRedButton>
          <StyledGreenButton>REDIGER</StyledGreenButton>
          <StyledGreenButton onClick={showUploadImageModal}>
            LAST OPP BILDE
          </StyledGreenButton>
        </StyledAdminButtons>
      );
    }
    return null;
  };

  if (!article) {
    console.log(article);
    return (
      <section>
        <StyledBanner>
          <StyledArticleHeader style={{ fontSize: '20px' }}>
            Artikkel ikke funnet (Prøv å logge deg inn på nytt)
          </StyledArticleHeader>
        </StyledBanner>
      </section>
    );
  }

  return (
    <section>
      <StyledBanner
        style={{
          backgroundImage: `url(http://localhost:3001/article/img?articleId=${id})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'space',
        }}
      >
        <StyledArticleHeader>{article.Title}</StyledArticleHeader>
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
        {showImageUploadModal ? (
          <UploadImageToArticleModal articleId={id} closeModal={closeModal} />
        ) : null}
      </StyledMainContent>
    </section>
  );
}

export default ArticleDetails;
