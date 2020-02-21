import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteVehicle } from '../store/reducer'
import VehicleList from '../components/VehicleList'

const mapStateToProps = (state) => ({
	vehicles: state.vehicleReducer.vehicles
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({ deleteVehicle }, dispatch)
);

const Home = connect(mapStateToProps, mapDispatchToProps)(VehicleList);

export default Home;
