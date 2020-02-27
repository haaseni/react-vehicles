import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddVehicleForm from '../components/AddVehicleForm';
import { fetchMakes } from '../store/fetchMakes';
import { addVehicle } from '../store/reducer';

const mapStateToProps = (state) => ({
	vehicles: state.vehicleReducer.vehicles,
	makes: state.vehicleReducer.makes,
	loading: state.vehicleReducer.loading,
	error: state.vehicleReducer.error
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({ fetchMakes, addVehicle }, dispatch)
);

const AddVehicle = connect(mapStateToProps, mapDispatchToProps)(AddVehicleForm);

export default AddVehicle;