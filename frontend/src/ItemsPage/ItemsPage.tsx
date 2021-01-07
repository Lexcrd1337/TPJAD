import React from 'react';
import { Card } from 'react-bootstrap';
import { itemService } from '../services';
import { Item } from '../services/item.service';

interface StateTypes {
  departmentName: string;
  items: Item[] | null;
}

class ItemsPage extends React.Component<{}, StateTypes> {
  constructor(props: any) {
    super(props);

    this.state = {
      departmentName: props.match.params.name,
      items: null,
    };
  }

  componentDidMount(): void {
    const { departmentName } = this.state;

    if (departmentName === 'All') {
      itemService.getAll().then((items) => this.setState({ items }));
    } else {
      itemService.getAllByDepartmentName(departmentName).then((items) => this.setState({ items }));
    }
  }

  displayItems = (items: Item[] | null) => {
    if (items) {
      return items.map((item) => {
        return (
          <Card style={{ width: '18rem', marginTop: '10px' }} key={item.id}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.name} from {item.brand}. {item.price} RON
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href={`/items/${item.name}`}>See More Details</Card.Link>
            </Card.Body>
          </Card>
        );
      });
    }

    return <div />;
  };

  render(): JSX.Element {
    const { items, departmentName } = this.state;

    return (
      <div>
        <h1>{departmentName} Items</h1>
        {this.displayItems(items)}
      </div>
    );
  }
}

export default ItemsPage;
