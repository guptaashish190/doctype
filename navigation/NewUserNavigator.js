import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

// Screens Import
import StartScreen from '../screens/NewUser/StartScreen';
import BasicInfoScreen from '../screens/NewUser/BasicInfoScreen';
import SelectClinicScreen from '../screens/NewUser/SelectClinicScreen';
import SelectHospitalScreen from '../screens/NewUser/SelectHospitalScreen';
import SelectProfilePicScreen from '../screens/NewUser/SelectProfilePicScreen';

export default createAppContainer(createBottomTabNavigator({
    SelectProfilePic: SelectProfilePicScreen,
    SelectClinic: SelectClinicScreen,
    SelectHospital: SelectHospitalScreen,
    BasicInfo: BasicInfoScreen,
    Start: StartScreen,
}, {
        tabBarOptions: {
            style: {
                display: 'none'
            }
        }
    }));