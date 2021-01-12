import React from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Department, departmentService } from '../services/department.service';
import { ItemCreateDTO, itemService } from '../services/item.service';

enum AlertVariant {
  SUCCESS = 'success',
  DANGER = 'danger',
}

interface StateTypes {
  item?: ItemCreateDTO;
  departments?: Department[];
  alertVariant?: AlertVariant;
  alertMessage?: string;
}

class CreateItemPage extends React.Component<{}, StateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }

  componentDidMount(): void {
    departmentService.getAll().then((departments) => this.setState({ departments }));
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { item } = this.state;

    this.setState({ item: { ...item, [event.target.name]: event.target.value } });
  }

  saveItem(): void {
    const { item } = this.state;

    console.log(item);

    if (item) {
      itemService
        .createItem(item)
        .then(() => {
          this.setState({
            alertVariant: AlertVariant.SUCCESS,
            alertMessage: 'Item created succesfully.',
          });
        })
        .catch(() => {
          this.setState({
            alertVariant: AlertVariant.DANGER,
            alertMessage: 'Error while creating item.',
          });
        });
    }
  }

  render(): JSX.Element {
    const { alertMessage, alertVariant, departments } = this.state;

    const departmentOptions = departments?.map((department) => (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    ));

    return (
      <Card style={{ width: '18rem', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>Create an item</Card.Title>
          <Form.Control name="name" type="text" placeholder="Name" onChange={this.handleChange} />
          <br />
          <Form.Control
            name="price"
            type="number"
            placeholder="Price"
            onChange={this.handleChange}
          />
          <br />
          <Form.Control
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={this.handleChange}
          />
          <br />
          <Form.Control name="brand" type="text" placeholder="Brand" onChange={this.handleChange} />
          <br />
          <Form.Control
            name="image"
            type="text"
            placeholder="Image URL"
            onChange={this.handleChange}
          />
          <br />
          <Form.Control
            name="departmentId"
            as="select"
            onChange={this.handleChange}
            value={undefined}
            defaultValue="DEFAULT"
          >
            <option key="0" disabled value="DEFAULT">
              Select a department
            </option>
            {departmentOptions}
          </Form.Control>
          <br />
          <Button type="button" onClick={this.saveItem}>
            Save
          </Button>
          <br />
          <br />
          {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
        </Card.Body>
      </Card>
    );
  }
}

export default CreateItemPage;
