<<<<<<< HEAD
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Offices from '../pages/Offices';
import Articles from '../pages/Articles';
import Contact from '../pages/Contact';
import OfficesDetails from '../pages/OfficesDetails';
=======
import {Switch, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Offices from '../pages/Offices'
import Articles from '../pages/Articles'
import Contact from '../pages/Contact'
>>>>>>> ad1765b2b75122c556387e18a5703425bc00e3eb

function Routes(){
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/offices">
        <Offices />
      </Route>
      <Route path="/offices/:id">
        <OfficesDetails />
      </Route>
      <Route path="/articles">
        <Articles/>
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
    </Switch>
  )
}

export default Routes
