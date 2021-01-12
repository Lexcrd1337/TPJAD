import { authenticationService } from './authentication.service';
import { Department } from './department.service';

export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  image: string;
  department?: Department;
}

export interface ItemCreateDTO {
  name?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  image?: string;
  departmentId?: number;
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

async function getAll(): Promise<Item[]> {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const response = await fetch('http://localhost:8080/api/items', requestOptions);

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

async function getAllByDepartmentName(departmentName: string): Promise<Item[]> {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const response = await fetch(
    `http://localhost:8080/api/itemsByDepartment/${departmentName}`,
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

async function getByName(itemName: string): Promise<Item> {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const response = await fetch(`http://localhost:8080/api/itemByName/${itemName}`, requestOptions);

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

async function createItem(item: ItemCreateDTO): Promise<Item> {
  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(item) };
  const response = await fetch('http://localhost:8080/api/createItem', requestOptions);

  if (!response.ok) {
    const text = await response.text();
    const data = JSON.parse(text);
    const error = (data && data.message) || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

export const itemService = {
  getAll,
  getAllByDepartmentName,
  getByName,
  createItem,
};
