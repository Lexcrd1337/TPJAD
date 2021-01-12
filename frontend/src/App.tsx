import React from 'react';
import { Router, Route } from 'react-router-dom';

import { authenticationService, departmentService } from './services';
import { PrivateRoute, NavbarWrapper } from './components';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import history from './helpers';
import { User } from './services/user.service';
import { Department } from './services/department.service';
import ItemsPage from './ItemsPage';
import ItemPage from './ItemPage';
import Cart from './Cart';
import CreateDepartmentPage from './CreateDepartmentPage';

interface StateTypes {
  currentUser: User | null;
  departments: Department[];
}

class App extends React.Component<{}, StateTypes> {
  static logout(): void {
    authenticationService.logout();
    history.push('/login');
    window.location.reload(false);
  }

  constructor(props: never) {
    super(props);

    this.state = {
      currentUser: null,
      departments: [] as Department[],
    };
  }

  componentDidMount(): void {
    authenticationService.currentUser.subscribe((user: User) =>
      this.setState({ currentUser: user }),
    );
    departmentService.getAll().then((fetchedDepartments) => {
      this.setState({ departments: fetchedDepartments });
    });
  }

  render(): JSX.Element {
    const { currentUser, departments } = this.state;

    const isAdmin = currentUser?.role === 'admin';

    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <NavbarWrapper
              currentUser={currentUser}
              departments={departments}
              logoutFunction={App.logout}
            />
          )}
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <PrivateRoute path="/departments/:name" component={ItemsPage} />
                  <PrivateRoute path="/items/:name" component={ItemPage} />
                  <PrivateRoute path="/cart" component={Cart} />
                  {isAdmin && (
                    <PrivateRoute path="/createDepartment" component={CreateDepartmentPage} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
