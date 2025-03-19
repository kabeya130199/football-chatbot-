import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';


export const SignupForm = ({handleOnChange, handleOnSubmit, formSwitcher, email, pass, website, agree, value}) => {
    const [passwordType, setPasswordType] = useState("password")

    const togglePassword = () => {
        if(passwordType === "password"){
            setPasswordType("text")
            return
        }
        setPasswordType("password")
    }
    
    return (
        <Container>
            <Row>
                <Col>
                    <div style={{width: "600px"}}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h3>Get started in a few clicks</h3>
                        <p>Provide excellent customer service and grow your sales</p>
                        <p><strong>Boost your revenue by 10-25% with Sales Chatbots</strong></p>
                        <p><strong>Engage your clients proactively, on all messaging channels</strong></p>
                        <p><strong>Reduce costs and automate up to 47% conversations with AI</strong></p>
                    </div>
                </Col>
                <Col>
                    <h2 className="text-center">Create a free account</h2>
                    <br></br>
                    <p style={{textAlign: "center"}}>No credit card required</p>
                    <Form autoComplete="off" onSubmit={handleOnSubmit}>
                        <Form.Group>
                            {/* <Form.Label>Email Address:</Form.Label> */}
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleOnChange}
                                value={email}
                                placeholder="Email"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group style={{position: "relative"}}>
                            {/* <Form.Label>Password:</Form.Label> */}
                            <Form.Control
                                type={passwordType}
                                name="password"
                                onChange={handleOnChange}
                                value={pass}
                                placeholder="Password"
                            />
                            <a style={{position:"absolute", top: "35%", right: "10px"}} onClick={togglePassword}> { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }</a>
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            {/* <Form.Label>Website:</Form.Label> */}
                            <Form.Control
                                type="text"
                                name="website"
                                onChange={handleOnChange}
                                value={website}
                                placeholder="Website"
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            {/* <Form.Control
                                type="checkbox"
                                name="agreement"
                                onChange={handleOnChange}
                                value={agree}
                            /> */}
                            <input type={"checkbox"} name = "agree" onChange={handleOnChange} value={agree}></input>
                            <Form.Label>I agree to ... </Form.Label>
                        </Form.Group>
                        <br></br>
                        <div className="d-grid gap-2">
                            <Button type="submit" size="lg" style={{borderRadius: "4px", padding: "20px"}}>Get Started</Button>
                        </div>
                    </Form>
                    <br/>
                    <div className="d-flex align-items-center">
                        <a onClick={() => formSwitcher('login')} style={{cursor: "pointer", marginLeft:"auto", marginRight:"auto"}}>Login now</a>
                    </div>
                    {/* <Row>
                        <Col>
                            
                        </Col>
                    </Row> */}
                </Col>

            </Row>

            
        </Container>
    )
}

SignupForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    formSwitcher: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    pass: PropTypes.string.isRequired,
}