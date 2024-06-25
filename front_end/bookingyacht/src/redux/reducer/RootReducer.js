import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import { YachtListReducer } from './YachtListReducer';
import { YachtReducer } from './YachtReducer';
import { YachtImagesReducer } from './YachtImagesReducer';
import { YachtServiceReducer } from './YachtServiceReducer';
import { ServiceByYachtReducer } from './ServiceByYachtReducer';
import { ScheduleReducer } from './ScheduleReducer';
import OrderReducer from './OrderReducer';
import RoomImageReducer from './RoomImageReducer';
import CustomerReducer from './CustomerReducer';

const RootReducer = combineReducers({
    account: userReducer,
    customer: CustomerReducer,
    YachtListReducer,
    YachtReducer,
    YachtImagesReducer,
    YachtServiceReducer,
    ServiceByYachtReducer,
    ScheduleReducer,
    OrderReducer,
    RoomImageReducer
});

export default RootReducer;