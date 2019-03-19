import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/Login';

export default createAppContainer(createSwitchNavigator({
  LoginScreen: LoginScreen
}));