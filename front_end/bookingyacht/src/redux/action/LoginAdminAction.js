import { jwtDecode } from "jwt-decode";
import { login as loginApi } from '../../services/ApiServices';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../type/Type";
export const loginRequest = () =>({
    type : LOGIN_REQUEST,
});

export const loginSuccess = (token) =>({
    type : LOGIN_SUCCESS,
    payload : token,
});

export const loginFailure = (error) =>({
    type : LOGIN_FAILURE,
    payload : error,
});

export const logout = () =>({
    type : LOGOUT,
});

export const login = (username, password) => async (dispatch) =>{
    dispatch(loginRequest());

    try{
        const response = await loginApi(username, password);
        const token = response.data.data;

        if(token){
            const decodedToken = jwtDecode(token);
            if(decodedToken.role && decodedToken.role === 'ROLE_ADMIN'){
                localStorage.setItem('token', token);
                dispatch(loginSuccess(token));
            }else{
                // toast.error("Bạn không đủ quyền hạn để truy cập.");
                dispatch(loginFailure("Bạn không đủ quyền hạn để truy cập."));
            }
        }else{
            dispatch(loginFailure('Không nhận được token từ phản hồi.'));
        }
    }catch(error){
        dispatch(loginFailure('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'));
    }
    
}