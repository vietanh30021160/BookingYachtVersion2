import { GET_SCHEDULE_BY_ID, GET_SCHEDULE_BY_YACHT } from "../type/Type";

const initSchedulesState = {
    schedules: [],
    schedule: ''
}

export const ScheduleReducer = (state = initSchedulesState, action) => {
    switch (action.type) {
        case GET_SCHEDULE_BY_YACHT:
            return {
                ...state,
                schedules: action.payload
            }
        case GET_SCHEDULE_BY_ID:
            return {
                ...state,
                schedule: action.payload
            }
        default:
            return state;
    }
}