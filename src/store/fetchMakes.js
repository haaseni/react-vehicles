import * as Constants from './constants'

export const fetchMakesBegin = () => ({
    type: Constants.FETCH_MAKES_BEGIN
});
  
export const fetchMakesSuccess = makes => ({
    type: Constants.FETCH_MAKES_SUCCESS,
    payload: { 
        makes 
    }
});

export const fetchMakesFailure = error => ({
    type: Constants.FETCH_MAKES_FAILURE,
    payload: { 
        error 
    }
});

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

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

