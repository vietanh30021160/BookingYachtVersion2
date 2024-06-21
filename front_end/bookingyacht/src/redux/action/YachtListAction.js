import { getAllYacht } from "../../services/ApiServices"
import { GET_ALL_YACHT } from "../type/Type"

export const getYachtListApi = () => {
    return async dispatch => {
        try {
            const res = await getAllYacht();
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_ALL_YACHT,
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