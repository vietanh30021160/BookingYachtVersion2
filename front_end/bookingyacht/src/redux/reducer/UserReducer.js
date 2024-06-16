import { FETCH_USER_LOGIN_SUCCES } from "../action/UserAction";
const INITIAL_STATE = {
    account: {
        data: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCES:
            return {
                ...state,
                account: {
                    data: action.payload.data.data
                },
                isAuthenticated: true
            };


        default: return state;
    }
};

export default userReducer;