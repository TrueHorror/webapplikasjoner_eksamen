/* eslint-disable react/prop-types */
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Offices from '../pages/Offices';
import Articles from '../pages/Articles';
import Contact from '../pages/Contact';
import OfficesDetails from '../pages/OfficesDetails';
import Login from '../pages/Login';
import CreateArticle from '../pages/CreateArticle';
import ArticleDetails from '../pages/ArticleDetails';
import Register from '../pages/Register';

function Routes({ handleOverlay }) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/offices">
        <Offices />
      </Route>
      <Route path="/office/:id">
        <OfficesDetails />
      </Route>
      <Route path="/articles">
        <Articles />
      </Route>
      <Route path="/article/:id">
        <ArticleDetails />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/createarticle">
        <CreateArticle handleOverlay={handleOverlay} />
      </Route>
    </Switch>
  );
}

export default Routes;
