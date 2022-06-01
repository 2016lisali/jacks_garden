import * as api from "../api/api.js";
import { loginStart, loginSuccess, loginFailure } from '../redux/userReducer.js'
export const login = async (formData, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const { data } = await api.login(formData);
    const { userId, firstName, lastName, email, isAdmin, token } = data;
    localStorage.setItem('jg_user', JSON.stringify({ user: { userId, firstName, lastName, email, isAdmin, token } }))
    dispatch(loginSuccess({ userId, firstName, lastName, email, isAdmin }))
    setTimeout(() => {
      navigate("/")
    }, 3000);
  } catch (error) {
    dispatch(loginFailure())
    alert(error.response?.data || error.message);
  }
}
