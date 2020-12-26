import React from 'react';
import { Router, Route } from 'react-router-dom';

import { authenticationService, departmentService } from './services';
import { PrivateRoute, NavbarWrapper } from './components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { history } from './helpers';
import { User, Department } from './types';

interface StateTypes {
  currentUser: User | null;
  departments: Department[];
}

// eslint-disable-next-line @typescript-eslint/ban-types
class App extends React.Component<{}, StateTypes> {
  constructor(props: never) {
    super(props);

    this.state = {
      currentUser: null,
      departments: [] as Department[],
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((user: User) =>
      this.setState({ currentUser: user }),
    );
    departmentService.getAll().then((fetchedDepartments: Department[]) => {
      this.setState({ departments: fetchedDepartments });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser, departments } = this.state;

    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <NavbarWrapper
              currentUser={currentUser}
              departments={departments}
              logoutFunction={this.logout}
            />
          )}
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
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
