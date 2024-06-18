export const FETCH_USER_LOGIN_SUCCES = 'FETCH_USER_LOGIN_SUCCES';
export const USER_LOGOUT = 'USER_LOGOUT'
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