import { GET_ALL_YACHT_TYPE } from "../type/Type"

const initYachtTypeState = {
    yachtTypes: []
}

export const YachtTypeReducer = (state = initYachtTypeState, action) => {
    switch (action.type) {
        case GET_ALL_YACHT_TYPE:
            return {
                ...state,
                yachtTypes: action.payload
            }
        default:
            return state
    }
}