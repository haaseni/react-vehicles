import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
		super(props)

		this.state = {
            
        }
    }
    render() {
        return (
            <div className="navbar-container">
                <Link to="/">Home </Link>
                <Link to="/add">Add Vehicle</Link>
            </div>
        )
    }
}

export default Navbar;