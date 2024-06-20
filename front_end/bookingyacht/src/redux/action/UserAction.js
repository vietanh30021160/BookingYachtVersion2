import { FETCH_USER_LOGIN_SUCCES, USER_LOGOUT } from "../type/Type"


export const doLogin = (data, role, idCompany) => {
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: { data, role, idCompany }
    }
}
export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}