import { getAllRoomByYachtCustomer } from "../../services/ApiServices";
import { GET_ALL_ROOM_BY_YACHT } from "../type/Type";

export const getAllRoomByYachtApi = (idYacht) => {
    return async dispatch => {
        try {
            const res = await getAllRoomByYachtCustomer(idYacht);
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_ALL_ROOM_BY_YACHT,
                    payload: res.data.data
                })
            } else {
                console.error("Unexpected response structure:", res);
            }
        } catch (e) {
            console.error("Failed to fetch yacht data:", e);
        }
    }
}