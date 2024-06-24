const initialOrderState = {
    selectedRooms: [],
    bookingInfo: {
        schedule: {
            startDate: '',
            endDate: ''
        },
        fullName: '',
        phoneNumber: '',
        email: '',
        requirements: ''
    },
    totalPrice: 0,
}

const OrderReducer = (state = initialOrderState, action) => {
    switch (action.type) {

        default:
            return { ...state };
    }
}

export default OrderReducer