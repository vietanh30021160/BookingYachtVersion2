import { GET_ALL_YACHT, SEARCH_YACHT } from "../type/Type"

const initYachtListState = {
    yachtList: [],
    filteredYachtList: []
}

export const YachtListReducer = (state = initYachtListState, action) => {
    switch (action.type) {
        case GET_ALL_YACHT:
            return {
                ...state,
                yachtList: action.payload
            }
        case SEARCH_YACHT:
            const searchTerm = action.payload.toLowerCase();
            const filteredYachtList = state.yachtList.filter(yacht =>
                yacht.name.toLowerCase().startsWith(searchTerm)
            );
            return {
                ...state,
                yachtList: filteredYachtList
            };
        default:
            return state
    }
}

