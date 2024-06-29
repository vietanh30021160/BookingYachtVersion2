import { GET_ALL_YACHT, SEARCH_YACHT } from "../type/Type"

const initYachtListState = {
    yachtList: [],
    originalYachtList: []
}

export const YachtListReducer = (state = initYachtListState, action) => {
    switch (action.type) {
        case GET_ALL_YACHT:
            return {
                ...state,
                yachtList: action.payload,
                originalYachtList: action.payload
            }
        case SEARCH_YACHT:
            const { name, location, price } = action.payload
            const filteredYachtList = state.originalYachtList.filter((yacht) => {
                const matchedName = name.toLowerCase().trim() === '' ? yacht : yacht.name.toLowerCase().includes(name.toLowerCase().trim())
                const matchedLocation = location === 'all' ? yacht.location.name : yacht.location.name === location;
                // const matchedPrice = price === 'all' ? yacht : yacht.price <= price
                return matchedName && matchedLocation;
            })
            return {
                ...state,
                yachtList: filteredYachtList // Update yachtList with search results
            };
        default:
            return state
    }
}

