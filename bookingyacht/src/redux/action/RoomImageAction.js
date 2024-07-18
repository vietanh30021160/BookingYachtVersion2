import { getAllRoomImages } from "../../services/ApiServices";
import { GET_ROOM_IMAGES } from "../type/Type";

export const getAllRoomImagesApi = (idRoom) => {
    return async (dispatch) => {
        try {
            const res = await getAllRoomImages(idRoom);
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_ROOM_IMAGES,
                    payload: res.data.data
                })
            } else {
                console.error("Unexpected response structure:", res);
            }
        } catch (err) {
            console.log(err)
        }
    }
}
