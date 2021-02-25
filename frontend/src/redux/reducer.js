import { DATA_URL } from '../js/constants';

// Action Types
const DATA_LOADING = 'DATA_LOADING';
const DATA_FAILED = 'DATA_FAILED';
const ADD_DATA = 'ADD_DATA';

// State
export const Data = (state = {
  isLoading: true,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case ADD_DATA:
      return { ...state, isLoading: false, errMess: null, data: action.payload };
    case DATA_LOADING:
      return { ...state, isLoading: true, errMess: null, data: [] };
    case DATA_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, data: [] };
    default:
      return state
  }
};

// Functions
export const dataLoading = () => ({
  type: DATA_LOADING
});

export const dataFailed = (errMess) => ({
  type: DATA_FAILED,
  payload: errMess
});

export const addData = (data) => ({
  type: ADD_DATA,
  payload: data
});

export const fetchData = () => (dispatch) => {
  dispatch(dataLoading());
  return fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch(addData(data));
    })
};
