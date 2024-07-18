import { INFORMATION_CUSTOMER } from "../type/Type";


const INIT_INFORMATION = {
    information: {
        email: '',
        fullName: '',
        phoneNumber: '',
        address: ''
    },
}

const CustomerReducer = (state = INIT_INFORMATION, action) => {
    switch (action.type) {
        case INFORMATION_CUSTOMER:
            return {
                ...state,
                information: {
                    email: action.payload.email,
                    fullName: action.payload.fullName,
                    phoneNumber: action.payload.phoneNumber,
                    address: action.payload.address
                },
            };

        default: return state;
    }
};

export default CustomerReducer;