import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Button,
} from "reactstrap";
import Header from "components/Headers/Header";
import EnquiryModal from "components/EnquiryModal/EnquiryModal";

const List = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Enquiry form submitted");
    };


    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h3 className="mb-0">Lists</h3>
                                    <Button color="primary" onClick={toggleModal}>
                                        Add
                                    </Button>
                                </div>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Contact Number</th>
                                        <th scope="col">Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Taha</td>
                                        <td>Ali</td>
                                        <td>ali.taha1447@gmail.com</td>
                                        <td> +91-9981341447 </td>
                                        <td>Male</td>
                                    </tr>
                                    <tr>
                                        <td>Taha</td>
                                        <td>Ali</td>
                                        <td>ali.taha1447@gmail.com</td>
                                        <td> +91-9981341447 </td>
                                        <td>Male</td>
                                    </tr>
                                    <tr>
                                        <td>Taha</td>
                                        <td>Ali</td>
                                        <td>ali.taha1447@gmail.com</td>
                                        <td> +91-9981341447 </td>
                                        <td>Male</td>
                                    </tr>
                                    <tr>
                                        <td>Taha</td>
                                        <td>Ali</td>
                                        <td>ali.taha1447@gmail.com</td>
                                        <td> +91-9981341447 </td>
                                        <td>Male</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                2 <span className="sr-only">(current)</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
            <EnquiryModal modal={modalOpen}
                toggle={toggleModal}
                handleSubmit={handleFormSubmit}
            />
        </>
    );
};

export default List;
