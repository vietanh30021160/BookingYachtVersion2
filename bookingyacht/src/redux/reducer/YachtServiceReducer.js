import { GET_ALL_SERVICE } from "../type/Type"
const initServiceState = {
    services: []
}

export const YachtServiceReducer = (state = initServiceState, action) => {
    switch (action.type) {
        case GET_ALL_SERVICE:
            return {
                ...state,
                services: action.payload
            }
        default:
            return state
    }
}