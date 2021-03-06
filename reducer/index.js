import { combineReducers } from 'redux';
import { cloneDeep } from 'lodash';

const INITIAL_STATE = {
    base_url:'http://demoadminpane.searchappsl.com/api',
    api_token: null,
    user_id : null,
    username: null,
    password: null,
    categories:[],
    subCategories: [],
    cities: [],
    districts: [],
    prices: []
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_TOKEN':{
        const newState = cloneDeep(state);
        newState.api_token = action.token;
        newState.user_id = action.id;
        return newState;
      }
      
      case 'SET_META':{
        const newState = cloneDeep(state);
        newState.categories = action.data.categories;
        newState.subCategories = action.data.subCategories;
        newState.cities = action.data.cities;
        newState.districts = action.data.districts;
        newState.prices = action.data.prices;
        return newState;
      }

      case 'SET_CREDENTIALS': {
        const newState = cloneDeep(state);
        newState.api_token = action.data.api_token;
        newState.username = action.data.username;
        newState.password = action.data.password;
        return newState;
      }
      default:
        return state
    }
  };

export default combineReducers({
    auth: authReducer,
  });