const ACCESS_TOKEN = () => window.localStorage.getItem('token');
const SET_ACCESS_TOKEN = (token) => window.localStorage.setItem('token', token);
const CLEAR_ACCESS_TOKEN = () => window.localStorage.clear();

export { ACCESS_TOKEN, SET_ACCESS_TOKEN, CLEAR_ACCESS_TOKEN };
