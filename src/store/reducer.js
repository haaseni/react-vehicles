import { combineReducers } from 'redux';

// Action Creaters
export const addVehicle = (vin, make, model) => {
  return {
    type: "ADD_VEHICLE",
    payload: {
      vin: vin,
      make: make,
      model: model
    }
  };
};

export const updateVehicle = (vin, make, model) => {
  return {
    type: "UPDATE_VEHICLE",
    payload: {
      vin: vin,
      make: make,
      model: model
    }
  };
};

export const deleteVehicle = (vin) => {
  return {
    type: "DELETE_VEHICLE",
    payload: {
      vin: vin
    }
  };
};

// Reducers
const initialState = {
  vehicles: [
    {vin: "3VWSF31Y16M395533", make: "Pontiac", model: "GTO"},
    {vin: "5TDDK4CC8AS022805", make: "Lexus", model: "RX 450h"},
    {vin: "2CNDL63F166192844", make: "Nissan", model: "GT-R"}
  ]
}

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VEHICLE':
      return {
        ...state,
        vehicles: [...state.vehicles, action.payload]
      };
  
    case 'UPDATE_VEHICLE':
      return {
        ...state, 
        vehicles: state.vehicles.map(vehicle => {
          if (vehicle.vin !== action.payload.vin) {
            return vehicle;
          } else {
            return { ...vehicle, make: action.payload.make, model: action.payload.model };
          }
        })
      };

    case 'DELETE_VEHICLE':
      return { 
        ...state, 
        vehicles: state.vehicles.filter(vehicle => vehicle.vin !== action.payload.vin) 
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
	vehicleReducer
});

export default rootReducer;