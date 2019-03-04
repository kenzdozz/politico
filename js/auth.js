const authorization = localStorage.getItem('userToken');
let user = localStorage.getItem('user');

const adminReq = location.href.split('/').includes('admin');
const loginUrl = adminReq ? '../login.html' : 'login.html';

if (!authorization || !user) location.href = loginUrl;
else {
  user = JSON.parse(user);
  if (adminReq && !user.isadmin) location.href = '../votes.html';
}
