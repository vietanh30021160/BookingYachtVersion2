import { FILTER_YACHT, GET_ALL_YACHT, SEARCH_YACHT, SET_SELECTED_LOCATION } from "../type/Type"

const initYachtListState = {
    yachtList: [],
    originalYachtList: [],
    // selectedLocation: 'all'
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
            const { name, location } = action.payload
            const filteredYachtList = state.originalYachtList.filter((yacht) => {
                const matchedName = name.toLowerCase().trim() === '' || yacht.name.toLowerCase().includes(name.toLowerCase().trim())
                const matchedLocation = location === 'all' || yacht.location.name === location;
                // const matchedPrice = price === 'all' ? yacht : yacht.price <= price

                //Du thuyền chỉ được thêm vào filteredYachtList nếu cả matchedName và matchedLocation đều là true.
                return matchedName && matchedLocation;
            })
            return {
                ...state,
                yachtList: filteredYachtList // Update yachtList with search results
            };

        case FILTER_YACHT:
            const { selectedTypes = [], selectedServices = [], yachtServiceIds = [] } = action.payload;
            const filteredYachtList2 = state.originalYachtList.filter((yacht) => {
                const matchedType = selectedTypes.length === 0 || selectedTypes.includes(yacht.yachtType.starRanking.toString());
                // Ở đây, selectedServices.every(...) kiểm tra xem tất cả các dịch vụ 
                //trong selectedServices có tồn tại trong danh sách dịch vụ của du thuyền (yachtServiceIds) hay không.
                const matchedServices = selectedServices.length === 0 || selectedServices.every((serviceId) => {
                    const hasService = yachtServiceIds.some(({ idService, idYacht }) => {
                        const match = idYacht === yacht.idYacht && idService.toString() === serviceId;
                        return match;
                    });
                    return hasService;
                })
                return matchedType && matchedServices;
            });
            return {
                ...state,
                yachtList: filteredYachtList2
            };
        case SET_SELECTED_LOCATION:
            return {
                ...state,
                selectedLocation: action.payload
            };
        default:
            return state
    }
}

