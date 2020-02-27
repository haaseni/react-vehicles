import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EditVehicleForm from '../components/EditVehicleForm'
import { fetchMakes, updateVehicle } from '../store/reducer'

const mapStateToProps = (state) => ({
	vehicles: state.vehicleReducer.vehicles,
	makes: state.vehicleReducer.makes,
	loading: state.vehicleReducer.loading,
	error: state.vehicleReducer.error
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({ fetchMakes, updateVehicle }, dispatch)
);

const EditVehicle = connect(mapStateToProps, mapDispatchToProps)(EditVehicleForm);

export default EditVehicle;