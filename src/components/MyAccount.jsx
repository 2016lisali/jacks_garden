import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Button, Modal, Table } from "react-bootstrap";
import SpinnerDiv from "./SpinnerDiv";
import Breadcrumbs from "./Breadcrumbs";
import {
    getOrderDetailsByOrderId,
    getOrderDetailsByUserId,
    getUserById,
} from "../api/api";

const MyAccount = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState();
    const [myOrder, setMyOrder] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [modalState, setModalState] = useState({
        target: "",
        title: "",
        content: "",
        orderId: null,
        show: false,
    });

    const getOrderDetails = async (target, title, orderId) => {
        setModalState({
            target,
            title,
            orderId,
            content: <SpinnerDiv />,
            show: true,
        });
        try {
            const orderDetails = await getOrderDetailsByOrderId(orderId);
            const newContent = (
                <Table className="shadow-sm border small mb-3 bg-body rounded-3 text-secondary">
                    <thead className="bg-success bg-opacity-10">
                        <tr>
                            <th>ITEM</th>
                            <th>PRICE</th>
                            <th>QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails?.data &&
                            orderDetails.data?.map((product) => (
                                <tr>
                                    <td>{product.productName}</td>
                                    <td>{product.priceEach}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            );
            orderDetails?.data?.length > 0
                ? setModalState({
                      target,
                      title,
                      orderId,
                      content: newContent,
                      show: true,
                  })
                : setModalState({
                      target,
                      title,
                      orderId,
                      content: "Something wrong, please try later",
                      show: true,
                  });
        } catch (error) {
            console.log(error);
        }
    };
    const handleClose = () => setModalState({ ...modalState, show: false });
    const handleShow = async (target, title, content, orderId) => {
        orderId
            ? getOrderDetails(target, title, orderId)
            : setModalState({ target, title, content, orderId, show: true });
    };

    const DetailModal = () => {
        return (
            <Modal show={modalState.show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalState.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                    {modalState.content}
                </Modal.Body>
            </Modal>
        );
    };

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        const getOrderDetails = async () => {
            setIsFetching(true);
            try {
                const res = await getUserById(currentUser?.userId);
                res.data && setUser(res.data[0]);
                const result = await getOrderDetailsByUserId(
                    currentUser?.userId
                );
                result.data && setMyOrder(result.data);
                setIsFetching(false);
            } catch (error) {
                setIsFetching(false);
                console.log(error.response.data);
            }
        };
        currentUser && getOrderDetails();
    }, [currentUser]);

    return (
        <Container fluid="xl">
            <Breadcrumbs />
            <div className="border border-2 shadow-sm p-3 mt-4">
                <h3 className="my-3">Personal Details</h3>
                {isFetching ? (
                    <SpinnerDiv />
                ) : (
                    <>
                        <p>
                            <span className="fw-bolder me-2">First Name:</span>
                            {user?.firstName}
                        </p>
                        <p>
                            <span className="fw-bolder me-2">Last Name:</span>
                            {user?.lastName}
                        </p>
                        <p>
                            <span className="fw-bolder me-2">Email:</span>
                            {user?.email}
                        </p>
                        <Button
                            variant="link"
                            className="text-decoration-underline ps-0 d-none"
                            onClick={() =>
                                handleShow(
                                    "userDetails",
                                    "Personal Details",
                                    "here should be personal details"
                                )
                            }
                        >
                            Change my personal details
                        </Button>
                    </>
                )}
            </div>
            <div className="border border-2 shadow-sm p-3 my-4">
                <h3>My Orders</h3>
                {isFetching ? (
                    <SpinnerDiv />
                ) : (
                    <Table className="shadow-sm mb-5 bg-body rounded text-secondary">
                        <thead className="bg-success small bg-opacity-10">
                            <tr>
                                <th>ORDERID</th>
                                <th className="d-none d-md-table-cell">DATE</th>
                                <th>STATUS</th>
                                <th>AMOUNT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrder.length === 0 ? (
                                <tr className="d-flex align-items-center">
                                    <td> You haven't placed any order yet</td>
                                </tr>
                            ) : (
                                myOrder?.map((order) => (
                                    <tr key={order.orderId}>
                                        <td className="align-middle">
                                            {order.orderId}
                                        </td>
                                        <td className="align-middle d-none d-md-table-cell">
                                            {order.orderDate.split("T")[0]}
                                        </td>
                                        <td className="align-middle">
                                            {order.orderStatus}
                                        </td>
                                        <td className="align-middle">
                                            ${order.orderAmount / 100}
                                        </td>
                                        <td className="align-middle">
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    handleShow(
                                                        "orderDetails",
                                                        "Order Details",
                                                        "here should be order details",
                                                        order.orderId
                                                    )
                                                }
                                            >
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}
            </div>
            <DetailModal />
        </Container>
    );
};

export default MyAccount;
