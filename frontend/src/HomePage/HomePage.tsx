import React from 'react';

import { authenticationService } from '../services';
import { User } from '../services/user.service';

interface StateTypes {
  currentUser: User;
}

class HomePage extends React.Component<{}, StateTypes> {
  constructor(props: never) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
    };
  }

  render(): JSX.Element {
    const { currentUser } = this.state;

    return (
      <div>
        <h1>Hi, {currentUser.username}!</h1>
      </div>
    );
  }
}

export default HomePage;
