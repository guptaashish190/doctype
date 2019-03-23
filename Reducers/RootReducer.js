import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfoReducer';

export default combineReducers({
    UserInfo: UserInfoReducer
});