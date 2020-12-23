import { authenticationService } from './authentication.service';

// eslint-disable-next-line import/prefer-default-export
export const userService = {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  getAll,
};

function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.jwtToken) {
    return {
      Authorization: `Bearer ${currentUser.jwtToken}`,
      'Content-Type': 'application/json',
    };
  }

  return {};
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch('http://localhost:8080/api/users', requestOptions).then(handleResponse);
}
