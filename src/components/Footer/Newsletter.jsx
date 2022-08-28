// import './newsletter.scss';
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Container,
    Col,
    Form,
    FormControl,
    Row,
} from "react-bootstrap";
import { addEmail } from "../../api/api";
import SuccessDiv from "../SuccessDiv";
import SpinnerDiv from "../SpinnerDiv";

const Newsletter = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [isFetching, setIsFetching] = useState(false);
    const [isSucceed, setIsSucceed] = useState(false);
    const APIKEY = process.env.REACT_APP_APILAYER_KEY;
    const addToMailList = (data) => {
        const formDataJson = JSON.stringify(data);
        setIsFetching(true);
        const add = async () => {
            try {
                await addEmail(formDataJson);
                setIsFetching(false);
                setIsSucceed(true);
            } catch (error) {
                setIsFetching(false);
                alert(
                    error.response.data ||
                        "Can not add your email to the mailing list, please try later"
                );
            }
        };
        fetch(`https://api.apilayer.com/email_verification/${data.email}`, {
            method: "GET",
            headers: {
                apikey: APIKEY,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.is_deliverable) {
                    add();
                } else {
                    setIsFetching(false);
                    alert("Please enter a deliverable email address.");
                }
            });
    };

    return (
        <Container
            fluid
            className="newsletter-container d-flex justify-content-center py-5 px-0 mx-0"
        >
            <Container fluid="xl">
                <Row className="d-flex flex-column flex-md-row align-items-center justify-content-center ">
                    <Col>
                        <h3 className="fw-bold pe-5">
                            GET INSTANT DEALS AND EXCLUSIVE OFFERS!
                        </h3>
                    </Col>
                    {isSucceed ? (
                        <SuccessDiv message="Thank you. You have successfully subscribed to the Jack's Garden newsletter." />
                    ) : (
                        <Col className="pt-3">
                            <Form
                                className="input-group mb-2"
                                onSubmit={handleSubmit(addToMailList)}
                            >
                                <FormControl
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email to subscribe"
                                    className="form-control"
                                    {...register("email", {
                                        required:
                                            "Please enter your email to subscribe",
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                <Button variant="success" type="submit">
                                    {" "}
                                    {isFetching ? <SpinnerDiv /> : "Subscribe"}
                                </Button>
                            </Form>
                            <div className="text-danger">
                                {errors.email && errors.email.message}
                            </div>
                            <p>
                                By providing your email you agree that your
                                personal information will be handled in
                                accordance with our privacy policy.
                            </p>
                        </Col>
                    )}
                </Row>
            </Container>
        </Container>
    );
};

export default Newsletter;
