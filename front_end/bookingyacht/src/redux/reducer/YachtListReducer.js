import { GET_ALL_YACHT } from "../type/Type"

const initYachtListState = {
    yachtList: []
}

export const YachtListReducer = (state = initYachtListState, action) => {
    switch (action.type) {
        case GET_ALL_YACHT:
            return {
                ...state,
                yachtList: action.payload
            }
        default:
            return state
    }
}

