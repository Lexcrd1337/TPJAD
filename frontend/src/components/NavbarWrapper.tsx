import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavDropdownMenu } from 'react-bootstrap-submenu';
import { PersonCircle, Cart as CartIcon } from 'react-bootstrap-icons';
import { User } from '../services/user.service';
import { Department } from '../services/department.service';

interface PropTypes {
  currentUser: User | null;
  departments: Department[];
  logoutFunction: () => void;
}

function populateDepartmentsDropdown(departments: Department[]) {
  return departments.map((department) => {
    return (
      <NavDropdown.Item key={department.id} href={`/departments/${department.name}`}>
        {department.name}
      </NavDropdown.Item>
    );
  });
}

function NavbarWrapper(props: PropTypes): ReactElement {
  const { departments, logoutFunction, currentUser } = props;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">DIY Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdownMenu title="Departments" id="collasible-nav-dropdown">
            {populateDepartmentsDropdown(departments)}
            <NavDropdown.Divider />
            <NavDropdown.Item href="/departments/All">All</NavDropdown.Item>
          </NavDropdownMenu>
        </Nav>
        <Nav onSelect={logoutFunction}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/cart">
              <CartIcon color="#FFF" size={24} style={{ marginRight: '8px' }} />
            </Link>
            <PersonCircle color="#FFF" size={24} style={{ marginRight: '8px' }} />
            <Navbar.Text>{currentUser?.username}</Navbar.Text>
          </div>
          <Nav.Link eventKey="logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarWrapper;
