import * as api from "../api/api.js";
import { signin } from '../redux/userReducer.js'
export const login = async (formData, dispatch, setIsSuccess, navigate) => {
  try {
    const { data } = await api.login(formData);
    const { userId, firstName, lastName, email, isAdmin, token } = data;
    localStorage.setItem('jg_user', JSON.stringify({ user: { userId, firstName, lastName, email, isAdmin, token } }))
    dispatch(signin({ userId, firstName, lastName, email, isAdmin }))
    setIsSuccess(true)
    setTimeout(() => {
      navigate("/")
    }, 3000);
  } catch (error) {
    alert(error.response?.data);
  }
}
