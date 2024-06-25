import { GET_ALL_COMPANIES, GET_ALL_CUSTOMERS } from "../type/Type";

const initialState = {
    customers: [],
    companies: []
};

const AdminReducer = (state = initialState, action)=> {
    switch(action.type) {
        case GET_ALL_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            };
        case GET_ALL_COMPANIES:
            return {
                ...state,
                companies: action.payload
            };
        default:
            return state;
    }
}

export default AdminReducer;