import { FETCH_USER_LOGIN_SUCCES, USER_LOGOUT } from "../type/Type"


export const doLogin = (data, role) => {
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: { data, role }
    }
}
export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}