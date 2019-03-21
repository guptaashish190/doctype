import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DoctorNavigator from './DoctorNavigator';
import PatientNavigator from './PatientNavigator';
import LoginNavigator from './LoginNavigator';

export default createAppContainer(createSwitchNavigator({
  Patient: PatientNavigator,
  Doctor: DoctorNavigator,
  Login: LoginNavigator,
}));