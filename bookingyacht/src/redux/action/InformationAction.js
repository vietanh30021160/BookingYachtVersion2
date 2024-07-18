import { INFORMATION_CUSTOMER } from "../type/Type"

export const information = (email, fullName, phoneNumber, address) => {
    return {
        type: INFORMATION_CUSTOMER,
        payload: { email, fullName, phoneNumber, address }
    }
}