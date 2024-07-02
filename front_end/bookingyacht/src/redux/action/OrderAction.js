import { ADD_ROOM, REMOVE_ROOM, RESET_SELECTION, SET_TOTAL_PRICE, BOOK_WHOLE_YACHT, HANDLE_SERVICE_CHANGE, CALCULATE_TOTAL_PRICE, CLEAR_SELECTION_WHEN_EXIT } from "../type/Type"

export const addRoomAction = (room) => ({
    type: ADD_ROOM,
    payload: { room }
})

export const removeRoomAction = (room) => ({
    type: REMOVE_ROOM,
    payload: { room }
})

export const resetSelectionAction = () => ({
    type: RESET_SELECTION
})

export const setTotalPrice = (totalPrice) => ({
    type: SET_TOTAL_PRICE,
    payload: { totalPrice }
})

export const bookWholeYachtAction = () => ({
    type: BOOK_WHOLE_YACHT
})

export const clearSelectionWhenExit = () => ({
    type: CLEAR_SELECTION_WHEN_EXIT
})
