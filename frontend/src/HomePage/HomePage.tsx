import React from 'react';

import { userService, authenticationService } from '../services';
import { User } from '../types';

interface StateTypes {
  currentUser: User;
  users: User[] | null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
class HomePage extends React.Component<{}, StateTypes> {
  constructor(props: never) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null,
    };
  }

  componentDidMount() {
    userService.getAll().then((users) => this.setState({ users }));
  }

  render() {
    const { currentUser, users } = this.state;

    return (
      <div>
        <h1>Hi, {currentUser.username}!</h1>
        <p>You are logged in with React & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        {users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export { HomePage };
