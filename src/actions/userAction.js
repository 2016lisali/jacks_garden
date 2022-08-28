import * as api from "../api/api.js";
import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../redux/userReducer.js";
export const login = async (formData, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const { data } = await api.login(formData);
        const { userId, firstName, email } = data;
        localStorage.setItem(
            "jg_user",
            JSON.stringify({
                user: {
                    userId,
                    firstName,
                    email,
                    expires: new Date(
                        new Date().getTime() + 2 * 60 * 60 * 1000
                    ),
                },
            })
        );
        dispatch(loginSuccess({ userId, firstName, email }));
        setTimeout(() => {
            navigate("/");
        }, 3000);
    } catch (error) {
        dispatch(loginFailure());
        alert(error.response?.data || error.message);
    }
};
