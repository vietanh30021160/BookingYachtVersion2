import { getAllYachtType } from "../../services/ApiServices";
import { GET_ALL_YACHT_TYPE } from "../type/Type";

export const getAllYachtTypeApi = () => {
    return async dispatch => {
        try {
            const res = await getAllYachtType();
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_ALL_YACHT_TYPE,
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