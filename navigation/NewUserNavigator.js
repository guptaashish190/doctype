import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// Screens Import
import StartScreen from '../screens/NewUser/StartScreen';
import BasicInfoScreen from '../screens/NewUser/BasicInfoScreen';
import SelectClinicScreen from '../screens/NewUser/SelectClinicScreen';
import SelectHospitalScreen from '../screens/NewUser/SelectHospitalScreen';
import SelectProfilePicScreen from '../screens/NewUser/SelectProfilePicScreen';
import AddQualificationsSpecScreen from '../screens/NewUser/AddQualificationsSpecScreen';
import UsernamePasswordScreen from '../screens/NewUser/UNPassScreen';
import PatientBasicInfoScreen from '../screens/NewUser/Patient/PatientBasicInfoScreen';
import PatientSelectProfilePicScreen from '../screens/NewUser/Patient/PatientSelectProfilePicScreen';
import PatientSelectHomeScreen from '../screens/NewUser/Patient/PatientSelectHomeScreen';
import PatientBodyScreen from '../screens/NewUser/Patient/PatientBodyScreen';

export default createAppContainer(createStackNavigator({
    Start: StartScreen,
    SelectClinic: SelectClinicScreen,
    AddQualificationsSpec: AddQualificationsSpecScreen,
    PatientBasicInfo: PatientBasicInfoScreen,
    BasicInfo: BasicInfoScreen,
    UNPass: UsernamePasswordScreen,
    PatientBody: PatientBodyScreen,
    SelectHospital: SelectHospitalScreen,
    SelectProfilePic: SelectProfilePicScreen,
    PatientSelectProfilePric: PatientSelectProfilePicScreen,
    PatientSelectHome: PatientSelectHomeScreen,
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }));