import { combineReducers } from 'redux';
import AdminReducer from './AdminReducer';
import CustomerReducer from './CustomerReducer';
import loginAdminReducer from './LoginAdminReducer';
import OrderReducer from './OrderReducer';
import RoomImageReducer from './RoomImageReducer';
import { ScheduleReducer } from './ScheduleReducer';
import { ServiceByYachtReducer } from './ServiceByYachtReducer';
import userReducer from './UserReducer';
import { YachtImagesReducer } from './YachtImagesReducer';
import { YachtListReducer } from './YachtListReducer';
import { YachtReducer } from './YachtReducer';
import { YachtServiceReducer } from './YachtServiceReducer';

const RootReducer = combineReducers({
    account: userReducer,
    customer: CustomerReducer,
    YachtListReducer,
    YachtReducer,
    YachtImagesReducer,
    YachtServiceReducer,
    ServiceByYachtReducer,
    loginAdmin: loginAdminReducer,
    admin : AdminReducer,
    ScheduleReducer,
    OrderReducer,
    RoomImageReducer
});

export default RootReducer;