import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class EditVehicleForm extends Component {
    constructor(props) {
        super(props)
        const currentVehicle = this.props.vehicles.find(vehicle => vehicle.vin === this.props.match.params["vin"]);

        this.state = {
            vehicle: currentVehicle ? currentVehicle : null,
            newMake: null,
            newModel: null,
            redirect: null
        }
    }	
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateVehicle(this.state.vehicle.vin, this.state.newMake, this.state.newModel);
        setTimeout(() => this.setState({"redirect": "/"}), 1000);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="edit-vehicle-form-container">
                <h1>Edit Vehicle</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="vin">VIN:</label>
                        <span>{this.state.vehicle.vin}</span>
                    </div>
                    <div>
                        <label htmlFor="make">Make:</label>
                        <input type="text" id="newMake" 
                            onChange={this.handleChange}
                            defaultValue={this.state.vehicle.make} />
                    </div>
                    <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="newModel" 
                            onChange={this.handleChange}
                            defaultValue={this.state.vehicle.model} />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default EditVehicleForm