import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

// Screens Import
import StartScreen from '../screens/NewUser/StartScreen';
import BasicInfoScreen from '../screens/NewUser/BasicInfoScreen';
import SelectClinicScreen from '../screens/NewUser/SelectClinicScreen';

export default createAppContainer(createBottomTabNavigator({
    SelectClinic: SelectClinicScreen,
    BasicInfo: BasicInfoScreen,
    Start: StartScreen,
}, {
        tabBarOptions: {
            style: {
                display: 'none'
            }
        }
    }));