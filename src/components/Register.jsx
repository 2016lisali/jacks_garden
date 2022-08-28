import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactTooltip from "react-tooltip";
import { registerUser } from "../api/api";
import { FormInput } from "./index";
import SuccessDiv from "./SuccessDiv.jsx";
import SpinnerDiv from "./SpinnerDiv";

const schema = yup
    .object({
        firstName: yup
            .string()
            .max(50, "The length cannot be over 25")
            .matches(/^([a-zA-Z])+$/, "upper case and lower case letters only.")
            .required(),
        lastName: yup
            .string()
            .max(25, "The length cannot be over 25")
            .matches(/^([a-zA-Z])+$/, "upper case and lower case letters only.")
            .required(),
        email: yup.string().email().required(),
        password: yup
            .string()
            .matches(
                /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+*!=.]).*$/,
                `Minimum 8 characters, contain at least one uppercase, one lowercase, one number and one symbol
     from (@#$%^&+*!=.)`
            )
            .required(),
        confirmPassword: yup
            .string()
            .required()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();

const Register = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const formDataJSON = JSON.stringify(data);
        setIsFetching(true);
        try {
            const result = await registerUser(formDataJSON);
            setIsFetching(false);
            setIsSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
            console.log(result);
        } catch (error) {
            setIsFetching(false);
            alert(error.response.data);
        }
    };
    const navigate = useNavigate();

    return (
        <div className="register-container w-100  d-flex justify-content-center align-items-center py-4">
            {isSuccess ? (
                <SuccessDiv message="Welcome to Jack's Garden, redirecting you to login page now." />
            ) : (
                <>
                    <Form
                        className="register-form bg-white rounded-3 py-5 px-3 px-md-4 mx-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="text-center py-3">CREATE AN ACCOUNT</h2>
                        <Row>
                            <Col md>
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="firstName"
                                    formattedName="First Name"
                                    tips="upper case or lower case letters only, max length 25 letters."
                                />
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="lastName"
                                    formattedName="Last Name"
                                    tips="upper case or lower case letters only, max length 25 letters."
                                />
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="email"
                                    formattedName="Email"
                                    tips="must be a valid email address"
                                />
                            </Col>
                            <Col md>
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="password"
                                    type="password"
                                    formattedName="Password"
                                    tips="Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one symbol from #$%^&+*!=."
                                />
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="confirmPassword"
                                    type="password"
                                    formattedName="Confirm Password"
                                    tips="Passwords must match"
                                />
                            </Col>
                        </Row>
                        <p>
                            <small>
                                By creating an account, I consent to the
                                processing of my personal data in accordance
                                with the <b>PRIVACY POLICY</b>
                            </small>
                        </p>
                        <div className="d-grid gap-2 mb-3">
                            <Button variant="success" type="submit">
                                {isFetching ? <SpinnerDiv /> : "CREATE"}
                            </Button>
                        </div>
                        <p>
                            <small>Already have an account? </small>
                            <Link
                                to="/login"
                                style={{ color: "var(--colorGreen)" }}
                            >
                                <strong>Sign In Here</strong>
                            </Link>
                        </p>
                    </Form>
                    <ReactTooltip effect="solid" />
                </>
            )}
        </div>
    );
};
export default Register;
