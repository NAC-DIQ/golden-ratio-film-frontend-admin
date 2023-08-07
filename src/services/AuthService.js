import axios from 'axios';
import swal from 'sweetalert';
import { API_URL } from '../config';
import { loginConfirmedAction, logout } from '../store/actions/AuthActions';

export async function signUp(name, email, password) {
  //axios call
  console.log(name, email, password);
  const postData = {
    name,
    email,
    password,
  };
  const data = await axios.post(`${API_URL}auth/signup`, postData);
  console.log(data);
  return data;
}

export async function login(email, password) {
  const postData = {
    email,
    password,
  };
  const res = await axios.post(`${API_URL}auth/login`, postData);
  console.log(res);
  return res;
}

export function formatError(errorResponse) {
  console.log(errorResponse.msg);
  switch (errorResponse.msg) {
    case 'User already exists':
      //return 'Email already exists';
      swal('Oops', 'Email already exists', 'error');
      break;
    case 'EMAIL_NOT_FOUND':
      //return 'Email not found';
      swal('Oops', 'Email not found', 'error', { button: 'Try Again!' });
      break;
    case 'Invalid Credentials':
      //return 'Invalid Password';
      swal('Oops', 'Invalid Password', 'error', { button: 'Try Again!' });
      break;
    case 'USER_DISABLED':
      return 'User Disabled';

    default:
      swal('Oops', 'Something went wrong', 'error', { button: 'Try Again!' });
      return '';
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  // tokenDetails.inToken = tokenDetails.token;
  localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
  
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem('userDetails');
  let tokenDetails = '';
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);

  dispatch(loginConfirmedAction(tokenDetails));
}
