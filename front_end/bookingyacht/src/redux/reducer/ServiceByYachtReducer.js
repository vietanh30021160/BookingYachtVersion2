import { GET_SERVICE_BY_YACHT } from "../type/Type"

const initServiceByYachtState = {
    services: []
}

export const ServiceByYachtReducer = (state = initServiceByYachtState, action) => {
    switch (action.type) {
        case GET_SERVICE_BY_YACHT:
            return {
                ...state,
                services: action.payload
            }
        default:
            return state;
    }
}