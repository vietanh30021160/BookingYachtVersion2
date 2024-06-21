import { GET_YACHT_BY_ID } from "../type/Type"

const initYachtState = {
    yacht: {}
}

export const YachtReducer = (state = initYachtState, action) => {
    switch (action.type) {
        case GET_YACHT_BY_ID:
            return {
                ...state,
                yacht: action.payload
            }
        default:
            return state
    }
}

