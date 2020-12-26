/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavDropdownMenu } from 'react-bootstrap-submenu';
import { PersonCircle } from 'react-bootstrap-icons';
import { Department, User } from '../types';

interface PropTypes {
  currentUser: User | null;
  departments: Department[];
  logoutFunction: () => void;
}

function populateDepartmentsDropdown(departments: Department[]) {
  return departments.map((department) => {
    return (
      <NavDropdown.Item key={department.id} href={`/department/${department.name}`}>
        {department.name}
      </NavDropdown.Item>
    );
  });
}

function NavbarWrapper(props: PropTypes): ReactElement {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">DIY Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdownMenu title="Departments" id="collasible-nav-dropdown">
            {populateDepartmentsDropdown(props.departments)}
          </NavDropdownMenu>
        </Nav>
        <Nav onSelect={props.logoutFunction}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PersonCircle color="#FFF" size={24} style={{ marginRight: '8px' }} />
            <Navbar.Text>{props.currentUser?.username}</Navbar.Text>
          </div>
          <Nav.Link eventKey="logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { NavbarWrapper };
