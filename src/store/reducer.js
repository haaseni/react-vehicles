import { combineReducers } from 'redux';

const ADD_VEHICLE = "ADD_VEHICLE";
const UPDATE_VEHICLE = "UPDATE_VEHICLE";
const DELETE_VEHICLE = "DELETE_VEHICLE";
const FETCH_MAKES_BEGIN = "FETCH_MAKES_BEGIN";
const FETCH_MAKES_SUCCESS = "FETCH_MAKES_SUCCESS";
const FETCH_MAKES_FAILURE = "FETCH_MAKES_FAILURE";

// Action Creaters
export const addVehicle = (vin, make, model, year) => {
  return {
    type: ADD_VEHICLE,
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
    type: UPDATE_VEHICLE,
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
    type: DELETE_VEHICLE,
    payload: {
      vin: vin
    }
  };
};

export const fetchMakesBegin = () => ({
  type: FETCH_MAKES_BEGIN
});

export const fetchMakesSuccess = makes => ({
  type: FETCH_MAKES_SUCCESS,
  payload: { 
    makes 
  }
});

export const fetchMakesFailure = error => ({
  type: FETCH_MAKES_FAILURE,
  payload: { 
    error 
  }
});

export function fetchMakes() {
    return dispatch => { 
      dispatch(fetchMakesBegin());
      return fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        const makes = res.Results.map(make => { 
          return { value: make.Make_ID, label: make.Make_Name.trim() }; 
        });
        const results = dispatch(fetchMakesSuccess(makes));
        return results.payload.makes;
      })
      .catch(error => dispatch(fetchMakesFailure(error)));
    }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// Reducers
const initialState = {
  vehicles: [
    {vin: "3VWSF31Y16M395533", make: 536, model: 4993, year: 1967},
    {vin: "5TDDK4CC8AS022805", make: 515, model: 2214, year: 2013},
    {vin: "2CNDL63F166192844", make: 478, model: 1890, year: 2017},
    {vin: "WBABW33424PL24293", make: 448, model: 3647, year: 2019},
    {vin: "1FTNF21P74EB80162", make: 452, model: 9570, year: 2016},
    {vin: "19XFB2F54EE271242", make: 467, model: 1829, year: 1969},
    {vin: "1FAHP2F82DG281292", make: 460, model: 1779, year: 2014},
    {vin: "WBAVA37538NL25176", make: 515, model: 21951, year: 2018},
    {vin: "3GNFC16068G259766", make: 467, model: 14475, year: 1970},
    {vin: "1HGEM1157YL175125", make: 449, model: 2081, year: 2016},
    {vin: "4T4BE46K19R050892", make: 441, model: 1685, year: 2018},
    {vin: "1GKFC13J67R362579", make: 460, model: 1781, year: 2020},
    {vin: "1HTSDNXN0MH398252", make: 460, model: 6825, year: 1971}
  ],
  makes: [],
  loading: false,
  error: null
}

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      return {
        ...state,
        vehicles: [...state.vehicles, action.payload]
      };
  
    case UPDATE_VEHICLE:
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

    case DELETE_VEHICLE:
      return { 
        ...state, 
        vehicles: state.vehicles.filter(vehicle => vehicle.vin !== action.payload.vin) 
      };

    case FETCH_MAKES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
  
    case FETCH_MAKES_SUCCESS:
      return {
        ...state,
        loading: false,
        makes: action.payload.makes
      };
  
    case FETCH_MAKES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
	vehicleReducer
});

export default rootReducer;