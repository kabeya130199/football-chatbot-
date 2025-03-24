import { Container, Row, Col, Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';


export const LoginForm = ({handleOnChange, handleOnSubmit, formSwitcher, email, pass, agree}) => {
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
                    <div style={{maxWidth: "400px"}}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h1>Don't have an account?</h1>
                        <br />
                        <button onClick={() => formSwitcher("signup")} className = "no_account">Create a free account</button>
                    </div>
                </Col>
                <Col>
                    <h2 className="text-center">Log In</h2>
                    <br></br>
                    <div className="text-center">
                        <button className="facebook_login">Log in with Facebook</button>
                        <br></br>
                        <br></br>
                        <div className="orSpacer">
                            <span>or</span>
                        </div>

                        <br></br><br></br>
                    </div>
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
                        <div className="d-grid gap-2">
                            <Button type="submit" size="lg" style={{borderRadius: "4px", padding: "20px"}}>Log In</Button>
                        </div>
                    </Form>
                    
                    <br/>
                    <div className="d-flex align-items-center">
                        <a onClick={() => formSwitcher('reset')} style={{cursor: "pointer", marginLeft:"auto", marginRight:"auto"}}>Forgot password?</a>
                    </div>
                </Col>


            </Row>

            {/* <Row>
                <Col>
                    
                </Col>
            </Row> */}
        </Container>
    )
}

LoginForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    formSwitcher: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    pass: PropTypes.string.isRequired,
}