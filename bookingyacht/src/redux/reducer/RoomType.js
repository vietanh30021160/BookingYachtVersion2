import { GET_ALL_ROOM_TYPE } from "../type/Type"

const initRoomTypeState = {
    roomTypes: [],
}

const RoomTypeReducer = (state = initRoomTypeState, action) => {
    switch (action.type) {
        case GET_ALL_ROOM_TYPE:
            return {
                ...state,
                roomTypes: action.payload
            }
        default:
            return state
    }
}