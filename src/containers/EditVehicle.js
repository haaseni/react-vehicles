import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EditVehicleForm from '../components/EditVehicleForm'
import { updateVehicle } from '../store/reducer'

const mapStateToProps = (state) => ({
	vehicles: state.vehicleReducer.vehicles
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({ updateVehicle }, dispatch)
);

const EditVehicle = connect(mapStateToProps, mapDispatchToProps)(EditVehicleForm);

export default EditVehicle;