import { authenticationService } from './authentication.service';
import { Item } from './item.service';

export interface User {
  id: number;
  name?: string | null;
  email?: string | null;
  username: string;
  role?: string | null;
}

function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.jwtToken) {
    return {
      Authorization: `Bearer ${currentUser.jwtToken}`,
      'Content-Type': 'application/json',
    };
  }

  return undefined;
}

async function getAll(): Promise<User[]> {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const response = await fetch('http://localhost:8080/api/users', requestOptions);

  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout();
      window.location.reload();
    }

    const text = await response.text();
    const data = JSON.parse(text);
    const error = (data && data.message) || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

async function addToCart(username: string, item: Item): Promise<User[]> {
  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(item) };
  const response = await fetch(`http://localhost:8080/api/addToCart/${username}`, requestOptions);

  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout();
      window.location.reload();
    }

    const text = await response.text();
    const data = JSON.parse(text);
    const error = (data && data.message) || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

async function getCart(username: string): Promise<Item[]> {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const response = await fetch(`http://localhost:8080/api/getCart/${username}`, requestOptions);

  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout();
      window.location.reload();
    }

    const text = await response.text();
    const data = JSON.parse(text);
    const error = (data && data.message) || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

async function removeFromCart(username: string, item: Item): Promise<Item[]> {
  const requestOptions = { method: 'DELETE', headers: authHeader() };
  const response = await fetch(
    `http://localhost:8080/api/removeFromCart/${username}?itemId=${item.id}`,
    requestOptions,
  );

  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout();
      window.location.reload();
    }

    const text = await response.text();
    const data = JSON.parse(text);
    const error = (data && data.message) || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

export const userService = {
  getAll,
  addToCart,
  getCart,
  removeFromCart,
};
