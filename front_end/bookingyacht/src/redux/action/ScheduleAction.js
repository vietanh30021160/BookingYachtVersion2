import { getScheduleByYacht } from "../../services/ApiServices";
import { GET_SCHEDULE_BY_YACHT } from "../type/Type";

export const getScheduleByYachtApi = (idYacht) => {
    return async dispatch => {
        try {
            const res = await getScheduleByYacht(idYacht);
            if (res && res.data && res.data.data) {
                dispatch({
                    type: GET_SCHEDULE_BY_YACHT,
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