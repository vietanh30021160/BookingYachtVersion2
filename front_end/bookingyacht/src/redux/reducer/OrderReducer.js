import { ADD_ROOM, BOOK_WHOLE_YACHT, CLEAR_SELECTION_WHEN_EXIT, REMOVE_ROOM, RESET_SELECTION, SET_TOTAL_PRICE } from "../type/Type";

const initialOrderState = {
    selectedRooms: [],
    addingService: [],
    totalPrice: 0,
}
console.log('initialOrderState', initialOrderState)
const OrderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case ADD_ROOM:
            return {
                ...state,
                selectedRooms: [...state.selectedRooms, action.payload.room]
            };
        case REMOVE_ROOM: {
            return {
                ...state,
                selectedRooms: state.selectedRooms.filter(room => room.idRoom !== action.payload.room.idRoom)
            }
        }
        case RESET_SELECTION: {
            return {
                ...state,
                selectedRooms: [],
                totalPrice: 0
            }
        }
        case SET_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.payload.totalPrice
            }
        }
        case CLEAR_SELECTION_WHEN_EXIT: {
            return {
                ...state,
                selectedRooms: [],
                addingService: [],
                totalPrice: 0
            }
        }
        default:
            return { ...state };
    }
}

export default OrderReducer