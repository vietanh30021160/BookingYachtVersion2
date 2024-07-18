import { getAllRoomType } from "../../services/ApiServices";
import { GET_ALL_ROOM_TYPE } from "../type/Type";

export const getAllRoomRypeApi = () => {
    return async dispatch => {
        try {
            const res = await getAllRoomType();
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_ALL_ROOM_TYPE,
                    payload: res.data.data,
                });
            } else {
                console.error("Unexpected response structure:", res);
            }
        } catch (err) {
            console.error("Failed to fetch yacht data:", err);
        }
    };
}