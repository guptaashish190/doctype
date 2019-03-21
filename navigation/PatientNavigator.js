import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

// Screens Import
import PatientScreen from '../screens/Patient/ProfileScreen';
import SearchScreen from '../screens/Patient/SearchScreen';
import SettingsScreen from '../screens/Patient/SettingsScreen';

export default createAppContainer(createDrawerNavigator({
  Profile: PatientScreen,
  Search: SearchScreen,
  Settings: SettingsScreen,
}));