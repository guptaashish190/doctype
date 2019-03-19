import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import PatientScreen from '../screens/Patient';


export default createAppContainer(createDrawerNavigator({
  Home: PatientScreen,
}));