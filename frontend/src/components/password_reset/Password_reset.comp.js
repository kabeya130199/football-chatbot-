import { Container, Row, Col, Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';


export const ResetPassword = ({handleOnChange, handleOnResetSubmit, formSwitcher, email, pass}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Reset Password</h1>
                    <hr/>
                    <Form autoComplete="off">
                        <Form.Group>
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleOnChange}
                                value={email}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        
                        <br></br>
                        <Button type="submit" onClick={handleOnResetSubmit}>Reset Password</Button>
                    </Form>
                    <hr/>
                </Col>

            </Row>

            <Row>
                <Col>
                    <a href="#" onClick={() => formSwitcher('login')}>Login now</a>
                </Col>
            </Row>
        </Container>
    )
}

ResetPassword.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    formSwitcher: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    pass: PropTypes.string.isRequired,
}