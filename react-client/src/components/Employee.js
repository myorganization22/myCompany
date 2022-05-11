import React, { Component } from "react";
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import { AddEmpModal } from "./AddEmpModel";
import { EditEmpModal } from "./EditEmpModel";

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emps: [],
            addModalShow: false,
            editModalShow: false,
            

        };
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'employee/')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    emps: data
                });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(empId) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'employee/' + empId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }
    }


    render() {
        const { emps, empId, empName, dep, photoFileName, dateOfJoining } = this.state;
        const addModalClose = () => this.setState({ addModelShow: false });
        const editModalClose = () => this.setState({ editModelShow: false });
        return (
            <div className="mt-5 d-flex justify-content-left">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                           <th>EmployeeId</th>
                           <th>EmployeeName</th>
                           <th>Department</th>
                           <th>DateOfJoining</th>
                           <th>Operation</th> 
                        </tr>
                    </thead>  
                    <tbody>
                        {
                            emps.map(emp => (
                                <th key={emp.employeeId}>
                                    <td>{emp.employeeId}</td>
                                    <td>{emp.employeeName}</td>
                                    <td>{emp.Department}</td>
                                    <td>{emp.DataOfJoining}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button 
                                                className="mr-2" 
                                                variant="success" 
                                                style={{'width': '80px'}}
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    empId: emp.EmployeeId,
                                                    empName: emp.EmployeeName,
                                                    dep: emp.Department,
                                                    photoFileName: emp.photoFileName,
                                                    dateOfJoining: emp.dateOfJoining
                                                })}
                                            >
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button 
                                                className="mr-3" 
                                                variant="danger" 
                                                style={{'width': '80px'}}
                                                onClick={() => this.deleteEmp(emp.EmployeeId)}
                                            >
                                                Delete
                                            </Button>

                                            <EditEmpModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                empId={empId}
                                                empName={empName}
                                                dep={dep}
                                                photoFileName={photoFileName}
                                                dateOfJoining={dateOfJoining}
                                            />
                                        </ButtonToolbar>
                                    </td>
                                </th>
                            ))
                        }
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({addModalShow: true})}
                    >
                        Add Employee
                    </Button>
{/*
                    <addEmpModel
                        show={this.state.state.addModalShow}
                        onClick={addModalClose}
                    />*/}
                </ButtonToolbar>
            </div>
        );
    }

}
