import { getImagesYacht } from "../../services/ApiServices";
import { GET_YACHT_IMAGE } from "../type/Type";

export const getYachtImagesApi = (id) => {
    return async dispatch => {
        try {
            const res = await getImagesYacht(id);
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_YACHT_IMAGE,
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