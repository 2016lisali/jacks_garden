import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { ArrowUp } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const BackToTopBtn = () => {
    const [showBtn, setShowBtn] = useState("none");
    const scroll = () => {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            setShowBtn("block");
        } else {
            setShowBtn("none");
        }
    };
    window.onscroll = function () {
        scroll();
    };
    const goTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <Button
            variant="success"
            className={`btp-btn d-${showBtn} position-fixed rounded-circle px-2 py-2`}
            style={{ bottom: "30px", right: "30px" }}
            data-tip="Go Top"
        >
            <ArrowUp size="25" role="button" onClick={goTop} />
            <ReactTooltip effect="solid" />
        </Button>
    );
};

export default BackToTopBtn;
