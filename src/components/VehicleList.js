import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import Loader from './Loader'

class VehicleList extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            currentPage: 1,
            vehiclesPerPage: 10,
            models: []
        };
    }
    componentDidMount = () => {
        const { vehicles } = this.props;
        this.props.fetchMakes();

        // Loop through vehicles and get models for the makes
        for(let i = 0; i < vehicles.length; i++) {
            const vehicle = vehicles[i];

            if (this.state.models.find(model => model.makeId === vehicle.make)) {
                continue;
            }

            fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + vehicle.make + "?format=json")
                .then(res => res.json())
                .then(res => {
                    const models = res.Results.map((model) => { 
                        return { makeId: vehicle.make, modelId: model.Model_ID, name: model.Model_Name.trim() }; 
                    });
                    this.setState(state => {
                        const newList = state.models.concat(models);
                        return { ...this.state, models: newList };
                    });
                });
        };
    }
    handlePageClick = (e) => {
        this.setState({currentPage: Number(e.target.text)});
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
            const { vin, make, model, year } = vehicle;

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
        const { vehicles, makes, loading, error } = this.props;
        const { models } = this.state;

        if (loading) {
            return <Loader />
        }
        if (error) {
            return <span className='vehicle-list-error'>{error}</span>
        }

        // Logic for displaying todos
        const indexOfLast = this.state.currentPage * this.state.vehiclesPerPage;
        const indexOfFirst = indexOfLast - this.state.vehiclesPerPage;
        let pageOfVehicles = vehicles ? vehicles.slice(indexOfFirst, indexOfLast) : [];

        // Lookup and load make and model labels
        pageOfVehicles = pageOfVehicles.map(vehicle => {
            const make = makes.find(make => make.value === vehicle.make);
            const model = models.find(model => model.modelId === vehicle.model);

            return {...vehicle, make: make ? make.label : null, model: model ? model.name : null};
        });

        // Logic for displaying page numbers
        const pageNumbers = [];

        if (vehicles) {
            for (let i = 1; i <= Math.ceil(vehicles.length / this.state.vehiclesPerPage); i++) {
                pageNumbers.push(i);
            }
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