import React, { useState } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Input,
    Button,
    Table,
    FormGroup,
    Label,
} from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const ExistingStudent = ({ modal,
    toggle, selectedBatch = {} }) => {
    // console.log(typeof selectedBatch.value.toString())
    // console.log(typeof selectedBatch.label)
    const [loading, setLoading] = useState(false);
    const [selectedFacultyName, setSelectedFacultyName] = useState(null);
    const [studentNameOptions, setStudentNameOptions] = useState([])
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentSearchText, setStudentSearchText] = useState('');
    // console.log(selectedStudent)
    const fetchStudentList = async () => {
        try {
            const res = await axios.get(`${API_PATH}/api/Get_User_List`, {
                params: {
                    APIKEY: API_KEY,
                    roleid: 2
                    // branchid: null,
                },
            });
            // console.log(res?.data?.Data)
            const formatted = res?.data.Data.map((item, index) => ({
                value: item?.Id,
                label: item?.Name,
            }));
            setStudentNameOptions(formatted)
            // console.log(formatted)
        } catch (error) {
            console.log(error);
        }
    }

    const handleAssignBatch = async () => {
        // setLoading(true);

        // const assignBatchData = {
        //     batchid: selectedBatch?.value.toString(),
        //     batch_student: studentID.map((item) => ({
        //         BatchID: selectedBatch?.value.toString(),
        //         enrollmentid: item?.enrollmentid.toString(),
        //     })),
        // };
        // Suppose props has batchId


        // Suppose selectedStudent is your dropdown value (object from react-select)
        const payload = {
            batchid: selectedBatch?.value.toString(), // ✅ from props
            batch_student: [
                {
                    studentid: selectedStudent?.value.toString() || null, // ✅ from dropdown
                },
            ],
        };
        console.log(payload)

        try {
            const assignBatch = await axios.post(
                `${API_PATH}/api/Assign_Batch`,
                payload,
                {
                    params: {
                        APIKEY: API_KEY,
                    },
                }
            );
            console.log(assignBatch)
            toast.success("Batch Assigned Successfully!!");
            // refreshList(1);
            // toggle();
            // resetSelected(); // ✅ Reset checkbox selection
        } catch (error) {
            console.log(error);
            toast.error("Request failed with status code 404");
        } finally {
            setLoading(false);
            setSelectedStudent(null)
            // refreshList(1);
            toggle();
            // resetSelected();
        }
    };

    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
        >
            <ModalHeader
                toggle={toggle}
                className="bg-white border-bottom"
                style={{ position: "sticky", top: 0, zIndex: 10 }}
            >
                <div className="h1 mb-0">Assign Batch</div>{" "}
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
                    <Row>
                        <Col lg={4}>
                            <FormGroup>
                                <Label>Student</Label>
                                <Select
                                    id="branch-select"
                                    options={studentNameOptions}
                                    value={selectedStudent}
                                    onChange={(selected) => setSelectedStudent(selected)}
                                    onInputChange={(text) => setStudentSearchText(text)}
                                    onMenuOpen={fetchStudentList}
                                    placeholder="Select student"
                                    menuPortalTarget={document.body} // ✅ renders dropdown outside modal
                                    menuPosition="fixed" // ✅ fixes position to avoid overflow
                                    styles={{
                                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                    }}
                                    isClearable

                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
            </ModalBody>
            <ModalFooter
                className="bg-white border-top d-flex justify-content-start"
                style={{ position: "sticky", bottom: 0, zIndex: 10, gap: "1rem" }}
            >
                <Button color="primary" onClick={handleAssignBatch}>
                    {
                        loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Assigning...
                            </>
                        ) : (
                            " Assign"
                        )}
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
            <ToastContainer />
        </Modal>
    )
}

export default ExistingStudent