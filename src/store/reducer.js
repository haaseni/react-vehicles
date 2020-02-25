import { combineReducers } from 'redux';

// Action Creaters
export const addVehicle = (vin, make, model, year) => {
  return {
    type: "ADD_VEHICLE",
    payload: {
      vin: vin,
      make: make,
      model: model,
      year: year
    }
  };
};

export const updateVehicle = (vin, make, model, year) => {
  return {
    type: "UPDATE_VEHICLE",
    payload: {
      vin: vin,
      make: make,
      model: model,
      year: year
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
    {vin: "3VWSF31Y16M395533", make: "Pontiac", model: "GTO", year: 1967},
    {vin: "5TDDK4CC8AS022805", make: "Lexus", model: "RX 450h", year: 2013},
    {vin: "2CNDL63F166192844", make: "Nissan", model: "GT-R", year: 2017},
    {vin: "WBABW33424PL24293", make: "Toyota", model: "Supra", year: 2019},
    {vin: "1FTNF21P74EB80162", make: "BMW", model: "M4", year: 2016},
    {vin: "19XFB2F54EE271242", make: "Chevrolet", model: "Camaro", year: 1969},
    {vin: "1FAHP2F82DG281292", make: "Ford", model: "Focus", year: 2014 },
    {vin: "WBAVA37538NL25176", make: "Lexus", model: "RC 500", year: 2018},
    {vin: "3GNFC16068G259766", make: "Chevrolet", model: "Chavelle", year: 1970},
    {vin: "1HGEM1157YL175125", make: "Mercedes", model: "E63", year: 2016},
    {vin: "4T4BE46K19R050892", make: "Tesla", model: "P100", year: 2018},
    {vin: "1GKFC13J67R362579", make: "Ford", model: "Mustang", year: 2020},
    {vin: "1HTSDNXN0MH398252", make: "Ford", model: "Bronco", year: 1971},
  ]
}

/*

*/

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
          } 
            
          return { ...vehicle, 
            make: action.payload.make, 
            model: action.payload.model,
            year: action.payload.year
          };
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