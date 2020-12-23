import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { authenticationService } from './services';
import { PrivateRoute } from './components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { history } from './helpers';
import User from './types';

interface StateTypes {
  currentUser: User | null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
class App extends React.Component<{}, StateTypes> {
  constructor(props: never) {
    super(props);

    this.state = { currentUser: null };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((user: User) =>
      this.setState({ currentUser: user }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">
                  Home
                </Link>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <a onClick={this.logout} className="nav-item nav-link">
                  Logout
                </a>
              </div>
            </nav>
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
