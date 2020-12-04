const theStore = (
  state = {
    loggedInUser: {},
    articles: [],
  },
  action
) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        loggedInUser: action.data,
      };
    case 'USER_LOGOUT':
      return {
        loggedInUser: '',
      };
    case 'REMOVE_USER_DATA':
      return {
        loggedInUser: '',
      };
    case 'SAVE_ARTICLES_IN_STORE':
      return {
        articles: action.articles,
      };
    default:
      return state;
  }
};

export default theStore;
