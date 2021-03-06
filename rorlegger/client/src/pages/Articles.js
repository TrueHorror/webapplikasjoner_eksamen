import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
  StyledPaginateButton,
} from '../styles/Styled';

import Auth from '../utils/authentication';
import {
  getNonSecretArticlesRequest,
  getCategoriesRequest,
  getAllArticles,
} from '../utils/apiCalls';
import { commonErrorHandler, errorToaster } from '../utils/global';

function Articles() {
  const articles = useSelector((state) => state.articles);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [paginatedArticles, setPaginatedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');
  const user = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      let res;
      if (user.email) {
        res = await getAllArticles();
      } else {
        res = await getNonSecretArticlesRequest();
      }
      dispatch({
        type: 'SAVE_ARTICLES_IN_STORE',
        articles: res.data.articles,
      });
      setFilteredArticles(res.data.articles);
      const catRes = await getCategoriesRequest();
      catRes.data.categories.unshift({
        Name: 'Ingen kategori valgt',
        _id: '',
      });
      setCategories(Object.assign(catRes.data.categories));
      // eslint-disable-next-line no-use-before-define
      updatePaginationButtons();
    } catch (e) {
      if (!commonErrorHandler(e)) {
        errorToaster('Noe gikk galt under henting av data');
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ArticlesList = () => {
    if (
      paginatedArticles &&
      paginatedArticles[currentPage] &&
      paginatedArticles[currentPage].length > 0
    ) {
      return paginatedArticles[currentPage].map((article, index) => (
        <StyledArticleListItem key={index}>
          <StyledArticleListItemImage
            style={{
              backgroundImage: `url(http://localhost:3001/article/img?articleId=${article._id})`,
              backgroundSize: 'cover',
            }}
          />
          <StyledArticleListItemContent>
            <StyledArticleListItemContentHeader>
              <Link
                to={{ pathname: `/article/${article._id}` }}
                style={{
                  fontSize: '40px',
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
    if (Auth.userIsLoggedInAsAdmin()) {
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

  const CategoryList = () => {
    if (categories && categories.length > 0) {
      return categories.map((category, index) => (
        <option
          date-testid={`category-input-${index}`}
          value={category._id}
          key={index}
        >
          {category.Name}
        </option>
      ));
    } else {
      return null;
    }
  };

  const updateChosenCategory = (evt) => {
    setChosenCategory(evt.target.value);
  };

  const filterOnSearchAndCategory = () => {
    let filteredOnCategory = articles;
    if (chosenCategory) {
      filteredOnCategory = articles.filter((article) => {
        if (article.Category) {
          return article.Category._id === chosenCategory;
        }
        return false;
      });
    }
    const searchRx = new RegExp(searchString, 'i');
    let filtered;
    if (filteredOnCategory) {
      filtered = filteredOnCategory.filter((article) =>
        searchRx.test(article.Title)
      );
    } else {
      filtered = [];
    }
    setFilteredArticles(filtered);
  };

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    filterOnSearchAndCategory();
  }, [chosenCategory, searchString]);

  const pageSplitter = () => {
    const pages = [];
    let articlesInPage = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filteredArticles.length; i++) {
      articlesInPage.push(filteredArticles[i]);
      if (i !== 0 && (i + 1) % 5 === 0) {
        pages.push(articlesInPage);
        articlesInPage = [];
      }
    }
    if (articlesInPage.length > 0) {
      pages.push(articlesInPage);
    }
    setPaginatedArticles(pages);
  };

  useEffect(() => {
    pageSplitter();
  }, [filteredArticles]);

  const updatePaginationButtons = () => {
    const activeButton = document.querySelector(
      `#pagination-buttons button[value='${currentPage}']`
    );
    if (activeButton) {
      activeButton.classList.add('active');
    }
  };

  useEffect(() => {
    updatePaginationButtons();
  }, [currentPage]);

  const changePage = (evt) => {
    setCurrentPage(evt.target.value);
  };

  const nextPage = () => {
    if (currentPage + 1 < paginatedArticles.length) {
      setCurrentPage(parseInt(currentPage) + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const Pagination = () => {
    if (paginatedArticles) {
      return (
        <div id="pagination-buttons">
          <StyledPaginateButton
            data-testid="previous-page-button"
            type="button"
            onClick={previousPage}
          >
            <ArrowLeftIcon />
          </StyledPaginateButton>
          <StyledPaginateButton
            data-testid="next-page-button"
            type="button"
            onClick={nextPage}
          >
            <ArrowRightIcon />
          </StyledPaginateButton>
          {paginatedArticles.map((article, index) => (
            <StyledPaginateButton
              className="pagination-button"
              type="button"
              value={index}
              key={index}
              data-testid={`pag-button-${index}`}
              onClick={changePage}
            >
              {index + 1}
            </StyledPaginateButton>
          ))}
        </div>
      );
    }
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
            <StyledInput
              id="search-input"
              data-testid="search-input"
              onChange={updateSearchString}
              defaultValue={searchString}
              type="text"
              style={{ marginRight: '10px' }}
              placeholder="søk"
            />
            <select
              onChange={updateChosenCategory}
              value={chosenCategory}
              data-testid="category-select"
            >
              <CategoryList />
            </select>
          </div>
        </StyledButtonGroupArticles>
        <div>
          <ArticlesList />
        </div>
        <Pagination />
      </StyledMainContent>
    </section>
  );
}

export default Articles;
