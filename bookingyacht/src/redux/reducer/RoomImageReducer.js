import { GET_ROOM_IMAGES } from "../type/Type"

const initRoomImagesState = {
    roomImages: [],
}

const RoomImageReducer = (state = initRoomImagesState, action) => {
    switch (action.type) {
        case GET_ROOM_IMAGES:
            return {
                ...state,
                roomImages: action.payload
            }
        default:
            return state
    }
}

export default RoomImageReducer;