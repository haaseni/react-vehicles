import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VehicleList from '../components/VehicleList'
import { 
	fetchMakes, 
	deleteVehicle 
} from '../store/reducer'

const mapStateToProps = (state) => ({
	vehicles: state.vehicleReducer.vehicles,
	makes: state.vehicleReducer.makes,
  	loading: state.vehicleReducer.loading,
  	error: state.vehicleReducer.error
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({ 
		fetchMakes: fetchMakes, 
		deleteVehicle: deleteVehicle 
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);