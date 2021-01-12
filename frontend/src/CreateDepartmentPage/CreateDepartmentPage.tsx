import React from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { DepartmentCreateDTO, departmentService } from '../services/department.service';

enum AlertVariant {
  SUCCESS = 'success',
  DANGER = 'danger',
}

interface StateTypes {
  department?: DepartmentCreateDTO;
  alertVariant?: AlertVariant;
  alertMessage?: string;
}

class CreateDepartmentPage extends React.Component<{}, StateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveDepartment = this.saveDepartment.bind(this);
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ department: { name: event.target.value } });
  }

  saveDepartment(): void {
    const { department } = this.state;
    if (department) {
      departmentService
        .createDepartment(department)
        .then(() => {
          this.setState({
            alertVariant: AlertVariant.SUCCESS,
            alertMessage: 'Department created succesfully.',
            department: undefined,
          });
        })
        .catch(() => {
          this.setState({
            alertVariant: AlertVariant.DANGER,
            alertMessage: 'Error while creating department.',
          });
        });
    }
  }

  render(): JSX.Element {
    const { alertMessage, alertVariant } = this.state;

    return (
      <Card style={{ width: '18rem', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>Create a department</Card.Title>
          <Form.Control
            type="text"
            placeholder="Department name"
            onChange={this.handleNameChange}
          />
          <br />
          <Button type="button" onClick={this.saveDepartment}>
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

export default CreateDepartmentPage;
