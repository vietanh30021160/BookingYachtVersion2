import { GET_SERVICE_BY_YACHT } from "../type/Type";
import { getServiceByYacht } from "../../services/ApiServices";
export const getServiceByYachtApi = (yachtId) => {
    return async dispatch => {
        try {
            const res = await getServiceByYacht(yachtId);
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_SERVICE_BY_YACHT,
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