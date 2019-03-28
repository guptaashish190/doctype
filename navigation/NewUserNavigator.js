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

export default createAppContainer(createStackNavigator({
    Start: StartScreen,
    SelectProfilePic: SelectProfilePicScreen,
    AddQualificationsSpec: AddQualificationsSpecScreen,
    UNPass: UsernamePasswordScreen,
    SelectHospital: SelectHospitalScreen,
    SelectClinic: SelectClinicScreen,
    BasicInfo: BasicInfoScreen,
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }));