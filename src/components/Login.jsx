import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../actions/userAction";
import SuccessDiv from "./SuccessDiv";
import SpinnerDiv from "./SpinnerDiv";


const Login = () => {
  const isFetching = useSelector(state => state.user?.isFetching);
  const [isSuccess, setIsSuccess] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
    const formDataJSON = JSON.stringify(data)
    login(formDataJSON, dispatch, setIsSuccess, navigate)
  }

  return (
    <div className="login-container w-100 d-flex justify-content-center align-items-center">
      {isSuccess ?
        <SuccessDiv message={`Welcome back ${currentUser?.firstName}, redirecting you to home page now`} /> :
        <Form className="login-form bg-white rounded-3 py-5 px-3 px-md-4" onSubmit={handleSubmit(handleLogin)}>
          <h1 className="text-center py-3">LOG IN</h1>
          <FloatingLabel className="mb-3" label="Email">
            <Form.Control
              type="email"
              placeholder="Email"
              {...register("email", { required: true })} />
            <p className="text-danger">{errors.email && "Unvalid email"}</p>
          </FloatingLabel>
          <FloatingLabel className="mb-3" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", {
                pattern: {
                  value: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+*!=.]).*$/,
                  message: `Password must be minimum 8 characters, contain at least one uppercase, one lowercase, one number and one symbol
                            from (@#$%^&+*!=.)`
                },
                required: 'Please enter your password',
              })} />
            <p className="text-danger">{errors.password && errors.password.message}</p>
          </FloatingLabel>
          <Link to="/account"><p>Forgot password?</p></Link>
          <p>Not have an account yet? <Link to="/register"><b>Register Here</b></Link></p>
          <div className="d-grid gap-2">
            <Button variant="success" type="submit">
              {isFetching ?
                <SpinnerDiv /> :
                "SUBMIT"}
            </Button>
          </div>
        </Form>}
    </div>
  )
}

export default Login;