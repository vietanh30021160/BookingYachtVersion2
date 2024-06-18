import { combineReducers } from 'redux';
import userReducer from './UserReducer';
const RootReducer = combineReducers({
    account: userReducer,
});

export default RootReducer;