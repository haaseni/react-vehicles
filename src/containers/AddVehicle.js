import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddVehicleForm from '../components/AddVehicleForm'
import { addVehicle } from '../store/reducer'

const mapStateToProps = (state) => ({
	vehicles: state.vehicleReducer.vehicles
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({ addVehicle }, dispatch)
);

const AddVehicle = connect(mapStateToProps, mapDispatchToProps)(AddVehicleForm);

export default AddVehicle;