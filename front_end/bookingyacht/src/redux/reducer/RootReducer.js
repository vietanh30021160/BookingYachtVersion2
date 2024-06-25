import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import { YachtListReducer } from './YachtListReducer';
import { YachtReducer } from './YachtReducer';
import { YachtImagesReducer } from './YachtImagesReducer';
import { YachtServiceReducer } from './YachtServiceReducer';
import { ServiceByYachtReducer } from './ServiceByYachtReducer';
import CustomerReducer from './CustomerReducer';

const RootReducer = combineReducers({
    account: userReducer,
    customer: CustomerReducer,
    YachtListReducer,
    YachtReducer,
    YachtImagesReducer,
    YachtServiceReducer,
    ServiceByYachtReducer,
});

export default RootReducer;