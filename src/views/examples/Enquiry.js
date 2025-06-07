import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
} from "reactstrap";
import Header from "components/Headers/Header";
import React, { useState } from "react";

const Enquiry = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleCheckboxChange = () => {
        setIsConfirmed(!isConfirmed);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isConfirmed) {
            console.log("Please confirm the details before submitting.");
            return;
        }

        console.log("Form submitted successfully.");
    };
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="justify-content-center">
                    <Col lg={12}>
                        <Card className="shadow">
                            <CardHeader className="bg-white">
                                <h1 className="mb-0" style={{ paddingBottom: '10px' }}>
                                    Enquiry Form
                                </h1>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Enter first name"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Enter last name"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter email"
                                                    type="email"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="contact">Contact Number</Label>
                                                <Input
                                                    id="contact"
                                                    name="contact"
                                                    placeholder="Enter contact number"
                                                    type="tel"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup tag="fieldset">
                                        <Label>Gender</Label>
                                        <Row>
                                            <Col md={3}>
                                                <FormGroup check>
                                                    <Input name="gender" type="radio" id="male" />
                                                    <Label check for="male">Male</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup check>
                                                    <Input name="gender" type="radio" id="female" />
                                                    <Label check for="female">Female</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup check>
                                                    <Input name="gender" type="radio" id="other" />
                                                    <Label check for="other">Other</Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="selectChoice">Select Your Choice</Label>
                                        <Input type="select" name="choice" id="selectChoice">
                                            <option value="">-- Select --</option>
                                            <option>General Enquiry</option>
                                            <option>Support</option>
                                            <option>Feedback</option>
                                            <option>Others</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input
                                            type="textarea"
                                            name="about"
                                            id="about"
                                            placeholder="Write something about your enquiry..."
                                            rows="4"
                                        />
                                    </FormGroup>

                                    <FormGroup check className="mb-4">
                                        <Input
                                            type="checkbox"
                                            id="confirmCheck"
                                            checked={isConfirmed}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Label check for="confirmCheck">
                                            I confirm the above details are correct
                                        </Label>
                                    </FormGroup>

                                    <div className="text-end">
                                        <Button type="submit" color="primary">Submit</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Enquiry;
