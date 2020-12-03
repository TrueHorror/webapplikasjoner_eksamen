/* eslint-disable no-return-await */
import Axios from 'axios';

const url = 'http://localhost:3001';

export async function loginRequest(email, pw) {
  return await Axios.put(`${url}/user`, {
    Email: email,
    Password: pw,
  });
}

export async function getArticlesRequest() {
  return await Axios.get(`${url}/article`);
}
