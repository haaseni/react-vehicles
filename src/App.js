import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import AddVehicle from './containers/AddVehicle'
import EditVehicle from './containers/EditVehicle'
import Error from './components/Error'

const App = () => (
    <div className="app-container">
        <Navbar />
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/add" component={AddVehicle} />
            <Route path="/edit/:vin" component={EditVehicle} />
            <Route component={Error} />
        </Switch>
    </div>
);

export default App;