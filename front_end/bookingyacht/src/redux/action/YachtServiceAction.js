import { getYachtService } from "../../services/ApiServices"
import { GET_ALL_SERVICE } from "../type/Type"
export const getAllServiceApi = () => {
    return async dispatch => {
        try {
            const res = await getYachtService();
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_ALL_SERVICE,
                    payload: res.data.data,
                });
            } else {
                console.error("Unexpected response structure:", res);
            }
        } catch (err) {
            console.error("Failed to fetch yacht data:", err);
        }
    }
}