import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_ALERT
} from './actionTypes';

import * as AuthService from '../services/auth.service';

// REGISTER =====================
export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password)
    .then ((response) => {
        // console.log('RESPONSE', response)
        dispatch({
            type: REGISTER_SUCCESS
        });

        dispatch({
            type: SET_ALERT,
            payload: response.data.message
        });

        return Promise.resolve();
    },
        (error) => {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || error.message || error.toString();
                dispatch ({
                    type: REGISTER_FAIL
                });
                dispatch ({
                    type: SET_ALERT,
                    payload: message
                });
                return Promise.reject();
    });
};
// LOGIN =====================
export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password)
    .then((data) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {user:data}
        });
        return Promise.resolve()
    },
    (error) => {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message || error.toString();
                dispatch ({
                    type: LOGIN_FAIL
                });
                dispatch ({
                    type: SET_ALERT,
                    payload: message
                });
                return Promise.reject();
    });
};
//LOGOUT ======================
export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT
    });
}