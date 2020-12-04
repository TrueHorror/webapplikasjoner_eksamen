import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Offices from '../pages/Offices';
import Articles from '../pages/Articles';
import Contact from '../pages/Contact';
import OfficesDetails from '../pages/OfficesDetails';
import Login from '../pages/Login';

function Routes() {
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
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default Routes;
