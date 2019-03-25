import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

// Screens Import
import StartScreen from '../screens/NewUser/StartScreen';
import BasicInfoScreen from '../screens/NewUser/BasicInfoScreen';

export default createAppContainer(createBottomTabNavigator({
    BasicInfo: BasicInfoScreen,
    Start: StartScreen,
}, {
        tabBarOptions: {
            style: {
                display: 'none'
            }
        }
    }));