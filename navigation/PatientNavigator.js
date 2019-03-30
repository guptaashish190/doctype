import React from 'react';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

// Screens Import
import PatientScreen from '../screens/Patient/ProfileScreen';
import SearchScreen from '../screens/Patient/SearchScreen';
import SettingsScreen from '../screens/Patient/SettingsScreen';
import DoctorDetailScreen from '../screens/Patient/DoctorDetailScreen';

const SearchNavigator = createStackNavigator({
  DoctorDetail: DoctorDetailScreen,
  Search: SearchScreen,
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

export default createAppContainer(createDrawerNavigator({
  Search: SearchNavigator,
  Profile: PatientScreen,
  Settings: SettingsScreen,
}));