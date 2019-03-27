import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// Screens Import
import StartScreen from '../screens/NewUser/StartScreen';
import BasicInfoScreen from '../screens/NewUser/BasicInfoScreen';
import SelectClinicScreen from '../screens/NewUser/SelectClinicScreen';
import SelectHospitalScreen from '../screens/NewUser/SelectHospitalScreen';
import SelectProfilePicScreen from '../screens/NewUser/SelectProfilePicScreen';
import AddQualificationsSpecScreen from '../screens/NewUser/AddQualificationsSpecScreen';

export default createAppContainer(createStackNavigator({
    BasicInfo: BasicInfoScreen,
    Start: StartScreen,
    SelectProfilePic: SelectProfilePicScreen,
    SelectClinic: SelectClinicScreen,
    AddQualificationsSpec: AddQualificationsSpecScreen,
    SelectHospital: SelectHospitalScreen,
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }));