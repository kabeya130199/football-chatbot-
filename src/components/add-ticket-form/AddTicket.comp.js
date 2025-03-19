import { Row, Col, Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
export const AddTicketForm = ({handleOnChange, handleOnSubmit, formData, formErrorData}) => {
    return (
        <div className="jumbotron justify-content-center mt-5 ms-auto me-auto" style={{"maxWidth":"550px"}}>
            <h1 className="text-info text-center">Add New Ticket</h1>
            <hr></hr>
            <Form autoComplete="off" onSubmit={handleOnSubmit} >
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Subject:</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            name="subject"
                            onChange={handleOnChange}
                            value={formData.subject}
                            placeholder="Enter subject"
                        />
                        <Form.Text className="text-danger">{formErrorData.subject && "subject required"}</Form.Text>
                        
                    </Col>
                    
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Issue Found:</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="date"
                            name="issueDate"
                            value={formData.issueDate}
                            onChange={handleOnChange}
                        />
                    </Col>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Details:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="details"
                        value={formData.details}
                        rows="5"
                        onChange={handleOnChange}
                    />
                
                </Form.Group>
                <br></br>
                <Row>

                <Button type="submit">Login</Button>
                </Row>
            </Form>

        </div>
    )
}

AddTicketForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    formErrorData: PropTypes.object.isRequired
}
