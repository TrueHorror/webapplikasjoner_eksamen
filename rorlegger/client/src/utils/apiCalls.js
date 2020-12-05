import Axios from 'axios';

function getToken() {
  return sessionStorage.getItem('token');
}

const url = 'http://localhost:3001';

export async function loginRequest(email, pw) {
  return Axios.put(`${url}/user`, {
    Email: email,
    Password: pw,
  });
}

export async function getWriters() {
  return Axios.get(`${url}/writers`);
}

export async function getArticlesRequest() {
  return Axios.get(`${url}/articles`);
}

export async function createArticleRequest(dataBody) {
  return Axios.post(`${url}/article`, dataBody, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}

export async function getCategories() {
  return Axios.get(`${url}/category`);
}

export async function createCategory(data) {
  return Axios.post(`${url}/category`, data);
}
