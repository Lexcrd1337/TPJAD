import { authenticationService } from './authentication.service';

export interface Department {
  id: number;
  name: string;
}

export interface DepartmentCreateDTO {
  name: string;
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

async function getAll(): Promise<Department[]> {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const response = await fetch('http://localhost:8080/api/departments', requestOptions);

  if (!response.ok) {
    const text = await response.text();
    const data = JSON.parse(text);
    const error = (data && data.message) || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

async function createDepartment(department: DepartmentCreateDTO): Promise<Department> {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(department),
  };
  const response = await fetch('http://localhost:8080/api/createDepartment', requestOptions);

  if (!response.ok) {
    const text = await response.text();
    const data = JSON.parse(text);
    const error = (data && data.message) || response.statusText;

    return Promise.reject(error);
  }

  return response.json();
}

export const departmentService = {
  getAll,
  createDepartment,
};
