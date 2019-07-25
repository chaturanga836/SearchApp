/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Login from './Login/Login';
import Customer from './CustomerDetail/Customer';
import ImageUpload from './CustomerDetail/ImageUpload';
import reducers from './reducer/index';

import { createAppContainer,createStackNavigator} from "react-navigation";

const store = createStore(reducers);

const AppNavigator = createStackNavigator({
  Login:{
    screen: Login
  },

  Customer: {
    screen: Customer
  },
  ImageUpload: {
    screen: ImageUpload
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component{

  
  render() {
    return (
      <Provider store={ store }>
      <React.Fragment>
        <AppContainer />
      </React.Fragment>
      </Provider>
    );
  }
}


