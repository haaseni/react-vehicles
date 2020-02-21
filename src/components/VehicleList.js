import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class VehicleList extends Component {
    constructor(props) {
		super(props)

		this.state = {
            vehicles: props.vehicles
        }
    }
    renderTableHeader = () => {
        if (this.state.vehicles.length > 0) {
            let header = Object.keys(this.state.vehicles[0])
            let returnHtml = header.map((key, index) => {
               return <th key={index}>{key.toUpperCase()}</th>
            })

            returnHtml.push(<th key={returnHtml.length + 1}>DELETE</th>) // Add the delete header
            return returnHtml;
        }
     }
    renderTableData = () => {
        return this.state.vehicles.map((vehicle, index) => {
            const { vin, make, model } = vehicle
            return (
               <tr key={vin}>
                  <td><Link to={`/edit/${vin}`}>{vin}</Link></td>
                  <td>{make}</td>
                  <td>{model}</td>
                  <td><button onClick={() => this.deleteVehicle(vin)}>Delete</button></td>
               </tr>
            )
         })
    }
    deleteVehicle = (vin) => {
        this.props.deleteVehicle(vin);
    }
    render() {
        return (
            <div className="vehicle-list-container">
                <h1>Vehicles</h1>
                <table id="vehicles">
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default VehicleList;