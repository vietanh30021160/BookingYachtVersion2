import { ADD_ROOM, REMOVE_ROOM, RESET_SELECTION, SET_TOTAL_PRICE } from "../type/Type"

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