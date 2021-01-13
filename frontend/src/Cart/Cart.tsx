import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Item } from '../services/item.service';
import { authenticationService } from '../services';
import { User, userService } from '../services/user.service';

interface StateTypes {
  items: Item[];
  currentUser: User;
}

class Cart extends React.Component<{}, StateTypes> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      currentUser: authenticationService.currentUserValue,
    };
  }

  componentDidMount(): void {
    const {
      currentUser: { username },
    } = this.state;

    if (username) {
      userService.getCart(username).then((items) => this.setState({ items }));
    }
  }

  displayItems = (items: Item[]) => {
    if (items.length) {
      return items.map((item) => {
        return (
          <Card style={{ width: '18rem', marginTop: '10px' }} key={item.id}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>Brand: {item.brand}</Card.Text>
              <Card.Text>Price: {item.price} RON</Card.Text>
              <Card.Text>Quantity: {item.quantity} pieces</Card.Text>
            </Card.Body>
            <Card.Body>
              <Button
                onClick={() => this.removeFromCart(item)}
                style={{ marginLeft: '165px' }}
                variant="danger"
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
        );
      });
    }
    return <div />;
  };

  removeFromCart = (item: Item) => {
    const {
      currentUser: { username },
    } = this.state;
    userService.removeFromCart(username, item).then((items) => this.setState({ items }));
  };

  render(): JSX.Element {
    const { items } = this.state;

    if (items.length) {
      return (
        <div>
          <h1>Your Cart</h1>
          {this.displayItems(items)}
        </div>
      );
    }

    return <h1>Your cart is empty! Add to cart items if you want to buy!</h1>;
  }
}

export default Cart;
