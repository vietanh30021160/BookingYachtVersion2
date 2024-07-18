import { GET_ALL_ROOM_BY_YACHT } from "../type/Type"

const initRoomState = {
    roomsByYacht: [],
}

export const RoomReducer = (state = initRoomState, action) => {
    switch (action.type) {
        case GET_ALL_ROOM_BY_YACHT:
            return {
                ...state,
                roomsByYacht: action.payload
            }
        default:
            return state
    }
}