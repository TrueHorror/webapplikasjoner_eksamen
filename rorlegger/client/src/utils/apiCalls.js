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

export async function registerUserRequest(payload) {
  return Axios.post(`${url}/user`, payload);
}

export async function getNonSecretArticlesRequest() {
  return Axios.get(`${url}/articles/non-secret`);
}

export async function getAllArticles() {
  return Axios.get(`${url}/articles/secret`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}
export async function getWriters() {
  return Axios.get(`${url}/writers`);
}

export async function createArticleRequest(dataBody) {
  return Axios.post(`${url}/article`, dataBody, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}

export async function addImageToArticleRequest(articleId, image) {
  return Axios.post(`${url}/article/img?articleId=${articleId}`, image, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}

export async function getCategoriesRequest() {
  return Axios.get(`${url}/category`);
}

export async function createCategoryRequest(data) {
  return Axios.post(`${url}/category`, data);
}
