import { GET_YACHT_IMAGE } from "../type/Type"

const initYachtImages = {
    images: []
};

export const YachtImagesReducer = (state = initYachtImages, action) => {
    switch (action.type) {
        case GET_YACHT_IMAGE:
            return {
                ...state,
                images: action.payload
            }
        default:
            return state
    }
}

