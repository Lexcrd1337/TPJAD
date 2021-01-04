import React from 'react';
import { Card } from 'react-bootstrap';
import { Cart, DashCircleFill, PlusCircleFill } from 'react-bootstrap-icons';
import { Item, itemService } from '../services/item.service';

interface StateTypes {
  itemName: string;
  item: Item | null;
  quantity: number;
  price: number;
}

class ItemPage extends React.Component<{}, StateTypes> {
  constructor(props: any) {
    super(props);

    this.state = {
      itemName: props.match.params.name,
      item: null,
      quantity: 0,
      price: 0,
    };
  }

  componentDidMount(): void {
    const { itemName } = this.state;

    itemService.getByName(itemName).then((item) => this.setState({ item }));
  }

  increaseQuantity = (): void => {
    const { item } = this.state;
    let { quantity, price } = this.state;
    quantity += 1;
    price = item?.price ? item.price * quantity : price;

    this.setState({ quantity, price });
  };

  decreaseQuantity = (): void => {
    const { item } = this.state;
    let { quantity, price } = this.state;

    if (quantity >= 1) {
      quantity -= 1;
      price = item?.price ? item.price * quantity : price;

      this.setState({ quantity, price });
    }
  };

  render(): JSX.Element {
    const { item, quantity, price } = this.state;

    return (
      <Card style={{ width: '18rem', marginTop: '10px' }} key={item?.id}>
        <Card.Img variant="top" src={item?.image} />
        <Card.Body>
          <Card.Title>{item?.name}</Card.Title>
          <Card.Text>
            {item?.name} from {item?.brand}. {item?.price} RON
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <h5>Quantity: {quantity}</h5>
            <div style={{ marginLeft: 'auto' }}>
              <DashCircleFill
                size={20}
                onClick={this.decreaseQuantity}
                style={{ marginRight: '8px' }}
              />
              <PlusCircleFill size={20} onClick={this.increaseQuantity} />
            </div>
          </div>
          <h5>Price: {price}</h5>
        </Card.Body>
        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
          <h4>Add to cart!</h4>
          <Cart size={24} style={{ marginLeft: 'auto' }} />
        </Card.Body>
      </Card>
    );
  }
}

export default ItemPage;
