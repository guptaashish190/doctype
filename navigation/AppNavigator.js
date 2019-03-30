import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DoctorNavigator from './DoctorNavigator';
import PatientNavigator from './PatientNavigator';
import LoginNavigator from './LoginNavigator';
import NewUserNavigator from './NewUserNavigator';

export default createAppContainer(createSwitchNavigator({
  NewUser: NewUserNavigator,
  Login: LoginNavigator,
  Patient: PatientNavigator,
  Doctor: DoctorNavigator,
}));