import { combineReducers } from 'redux';
import AdminReducer from './AdminReducer';
import loginAdminReducer from './LoginAdminReducer';
import { ServiceByYachtReducer } from './ServiceByYachtReducer';
import userReducer from './UserReducer';
import { YachtImagesReducer } from './YachtImagesReducer';
import { YachtListReducer } from './YachtListReducer';
import { YachtReducer } from './YachtReducer';
import { YachtServiceReducer } from './YachtServiceReducer';

const RootReducer = combineReducers({
    account: userReducer,
    YachtListReducer,
    YachtReducer,
    YachtImagesReducer,
    YachtServiceReducer,
    ServiceByYachtReducer,
    loginAdmin: loginAdminReducer,
    admin : AdminReducer,
});

export default RootReducer;