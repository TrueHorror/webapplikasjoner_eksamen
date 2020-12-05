import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from '../../utils/reducer';

export const compWrapper = (component, initialState) => {
  let mockStore;
  if (initialState) {
    mockStore = createStore(Store, initialState);
  } else {
    mockStore = createStore(Store);
  }
  return (
    <Router>
      <Provider store={mockStore}>{component}</Provider>
    </Router>
  );
};
