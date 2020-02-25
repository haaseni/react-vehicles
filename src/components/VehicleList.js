import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'

class VehicleList extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            currentPage: 1,
            vehiclesPerPage: 10
        };
    }
    handlePageClick = (e) => {
        this.setState({
            "currentPage": Number(e.target.text)
        });
    }
    renderTableHeader = (vehicles) => {
        if (vehicles.length > 0) {
            let header = Object.keys(vehicles[0])
            let returnHtml = header.map((key, index) => {
               return <th key={index}>{key.toUpperCase()}</th>
            })

            returnHtml.push(<th key={returnHtml.length + 1}>DELETE</th>) // Add the delete header
            return returnHtml;
        }
     }
    renderTableData = (vehicles) => {
        return vehicles.map((vehicle, index) => {
            const { vin, make, model, year } = vehicle
            return (
               <tr key={vin}>
                  <td><Link to={`/edit/${vin}`}>{vin}</Link></td>
                  <td>{make}</td>
                  <td>{model}</td>
                  <td>{year}</td>
                  <td><Button variant="danger" size="sm" onClick={() => this.deleteVehicle(vin)}>Delete</Button></td>
               </tr>
            )
         })
    }
    deleteVehicle = (vin) => {
        this.props.deleteVehicle(vin);
    }
    render() {
        // Logic for displaying todos
        const indexOfLast = this.state.currentPage * this.state.vehiclesPerPage;
        const indexOfFirst = indexOfLast - this.state.vehiclesPerPage;
        const pageOfVehicles = this.props.vehicles.slice(indexOfFirst, indexOfLast);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.vehicles.length / this.state.vehiclesPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <Pagination.Item 
                    key={number} 
                    active={number === this.state.currentPage} 
                    onClick={this.handlePageClick}>
                {number}
                </Pagination.Item>
            );
        });

        return (
            <Container className="vehicle-list-container">
                <h1>Vehicles</h1>
                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr>{this.renderTableHeader(pageOfVehicles)}</tr>
                        {this.renderTableData(pageOfVehicles)}
                    </tbody>
                </Table>
                <Pagination size="sm" className="text-xs-center">
                    {renderPageNumbers}
                </Pagination>
            </Container>
        )
    }
}

export default VehicleList;