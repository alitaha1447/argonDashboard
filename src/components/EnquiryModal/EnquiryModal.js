import React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
    Card,
} from "reactstrap";

const EnquiryModal = ({ modal, toggle, handleSubmit }) => {
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} size="lg" centered>
                <Card className="shadow border-0 mb-0">
                    <ModalHeader toggle={toggle} className="bg-white border-bottom">
                        <h2 className="mb-0">Enquiry Form</h2>
                    </ModalHeader>

                    <ModalBody>
                        <Form>
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
                                            <Label check for="male">
                                                Male
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup check>
                                            <Input name="gender" type="radio" id="female" />
                                            <Label check for="female">
                                                Female
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup check>
                                            <Input name="gender" type="radio" id="other" />
                                            <Label check for="other">
                                                Other
                                            </Label>
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

                            <FormGroup check className="mb-0">
                                <Input type="checkbox" id="confirmCheck" />
                                <Label check for="confirmCheck">
                                    I confirm the above details are correct
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Card>
            </Modal>
        </div>
    );
};

export default EnquiryModal;
