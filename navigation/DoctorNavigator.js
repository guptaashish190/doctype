import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import DoctorScreen from '../screens/Doctor/DoctorScreen';


export default createAppContainer(createDrawerNavigator({
  Home: DoctorScreen
}));