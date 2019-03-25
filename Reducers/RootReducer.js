import { combineReducers } from 'redux';

// Reducers
import UserInfoReducer from './UserInfoReducer';
import TestDoctorReducer from './TestDoctorReducer';

export default combineReducers({
    UserInfo: UserInfoReducer,
    TestDoctor: TestDoctorReducer
});