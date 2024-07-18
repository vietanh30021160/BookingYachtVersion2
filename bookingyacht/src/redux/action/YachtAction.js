import { getYachtByYachtId } from "../../services/ApiServices";
import { GET_YACHT_BY_ID } from "../type/Type";

export const getYachtByYachtIdApi = (id) => {
    return async dispatch => {
        try {
            const res = await getYachtByYachtId(id);
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_YACHT_BY_ID,
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