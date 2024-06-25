import { GET_SCHEDULE_BY_YACHT } from "../type/Type";

const initSchedulesState = {
    schedules: []
}

export const ScheduleReducer = (state = initSchedulesState, action) => {
    switch (action.type) {
        case GET_SCHEDULE_BY_YACHT:
            return {
                ...state,
                schedules: action.payload
            }
        default:
            return state;
    }
}