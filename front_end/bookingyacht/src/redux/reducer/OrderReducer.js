import { ADD_ROOM, REMOVE_ROOM, RESET_SELECTION, SET_TOTAL_PRICE } from "../type/Type";

const initialOrderState = {
    selectedRooms: [],
    addingService: [],
    requirement: '',
    idCustomer: '',
    idSchedule: '',
    totalPrice: 0,
}

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
        default:
            return { ...state };
    }
}

export default OrderReducer