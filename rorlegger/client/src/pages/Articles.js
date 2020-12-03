import {StyledBanner,
  StyledFilterButton,
  StyledMainContent,
  StyledButtonGroupArticles,
  StyledArticleListItem,
  StyledArticleListItemImage,
  StyledArticleListItemContent
} from "../styles/Styled";
import React, { useState, useEffect } from "react";
import {userIsLoggedInAsAdmin} from "../utils/authentication";
import {getArticlesRequest} from "../utils/apiCalls";
import { Link } from 'react-router-dom'

function Articles() {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticlesRequest()
      .then(res => setArticles(res.data.articles))
      .catch(e => {console.log(e); console.error('Noe gikk galt')})
  },[])

  const articlesList = articles.map((article) =>
    <StyledArticleListItem>
      <StyledArticleListItemImage></StyledArticleListItemImage>
      <StyledArticleListItemContent>
        <div><Link to={{ pathname: `/article/${article._id}` }} style={{fontSize: "50px", textDecoration: "none", color: "black" }}>{article.Title}</Link></div>
        <div>{article.Content}</div>
      </StyledArticleListItemContent>

    </StyledArticleListItem>
  )

  const NewArticleButton = () => {
    if (userIsLoggedInAsAdmin()){
      return <StyledFilterButton>NY ARTIKKEL</StyledFilterButton>
    } else {
      return null
    }
  }

  return (
    <section>
      <StyledBanner>
        <h1>Fagartikler</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledButtonGroupArticles>
          <div>
            <NewArticleButton/>
          </div>
          <div>
            <StyledFilterButton style={{marginRight: "10px"}}>SØK</StyledFilterButton>
            <StyledFilterButton>FILTER</StyledFilterButton>
          </div>
        </StyledButtonGroupArticles>
        <div>
          {articlesList}
        </div>
      </StyledMainContent>
    </section>
  )
}

export default Articles;
