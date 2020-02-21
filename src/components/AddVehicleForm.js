import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class AddVehicleForm extends Component {
    constructor(props) {
		super(props)

		this.state = {
            vin: null,
            make: null,
            model: null,
            redirect: null,
            message: null
        }
    }	
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const vehicleExists = this.props.vehicles.find(vehicle => vehicle.vin === this.state.vin);

        if (!vehicleExists) {
            this.props.addVehicle(this.state.vin, this.state.make, this.state.model);
            setTimeout(() => this.setState({"redirect": "/"}), 1000);
        } else {
            this.setState({"message": "A vehicle with that VIN already exists"});
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="add-vehicle-form-container">
                <h1>Add Vehicle</h1>
                <div className="form-message">
                    {this.state.message}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="vin">VIN:</label>
                        <input type="text" id="vin" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="make">Make:</label>
                        <input type="text" id="make" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" onChange={this.handleChange} />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddVehicleForm