import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';


export class AddEmpModal extends Component {
    
    photoFileName = "default.jpg";
    imageSrc = process.env.REACT_APP_PHOTOPATH + "department/";

    constructor(props) {
        super(props);
        this.state = {
            deps: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'department/')
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    deps: data
                });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'employee/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: null,
                EmployeetName: event.target.EmployeeName.value,
                Departmen: event.target.Department.value,
                DateOfJoining: event.target.Department.value,
                PhotoFileName: this.photoFileName
            })
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
        })
        .catch((error) => {
            alert('Operation Failed' + error);
        });
    }

    handleFileSelect(event){
        event.preventDefault();
        this.photoFileName = event.target.files[0].name
        const formData = new FormData();
        formData.append(
            'myFile',
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'employee/save_file', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((result) => {
                this.imageSrc = process.env.REACT_APP_PHOTOPATH + result;
            })
            .catch((error) => {
                alert('Operation Failed -> ' + error);
            })
    }

    render() {
        return (
            <div className='container'>
                <Modal {...this.props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='EmployeeName'>
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" placeholder="Employee Name" required/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId='Department'>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {
                                                this.state.deps.map(dep => (
                                                    <option key={dep.Department} value={dep.DepartmentName}></option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId='Department'>
                                        <Form.Label>DateOfJoining</Form.Label>
                                        <Form.Control type="data" name='DateOfJoining' placeholder="Date of joining" required/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>  
                                <br/>
                            </Col>
                            <Col sm={6}>
                                <image width="200" height="200" src={this.image} />
                                <input type='file' onChange={this.handleFileSelected} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}
