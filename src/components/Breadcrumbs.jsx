import { Breadcrumb } from "react-bootstrap";
import { HouseDoor } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
const Breadcrumbs = () => {
    const location = useLocation();
    const pages = location.pathname.split("/").splice(1);

    return (
        pages.length > 1 && (
            <Breadcrumb className="mt-3 ps-2">
                <Breadcrumb.Item href="/">
                    <HouseDoor />
                </Breadcrumb.Item>
                {pages &&
                    pages.map(
                        (page, index) =>
                            !Number(page) && (
                                <Breadcrumb.Item
                                    href={
                                        location.pathname.slice(
                                            0,
                                            location.pathname.indexOf(page)
                                        ) + page
                                    }
                                    key={index}
                                >
                                    {page}
                                </Breadcrumb.Item>
                            )
                    )}
            </Breadcrumb>
        )
    );
};

export default Breadcrumbs;
