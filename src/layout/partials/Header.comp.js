import { Nav, Navbar } from "react-bootstrap"
import logo from '../../assets/img/logo.png'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from "react-router-dom"
export const Header = () => {

    const navigate = useNavigate();
    const logMeOut = () => {
        navigate("/");
    }
    return (
        <Navbar expand="md" collapseOnSelect bg='info' variant="dark">
            <Navbar.Brand>
                <img src={logo} alt="logo" width='150px'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nab">
                <Nav className="ms-auto">
                    <LinkContainer to="/dashboard"><Nav.Link>Dashboard</Nav.Link></LinkContainer>
                    <LinkContainer to="/tickets"><Nav.Link>Tickets</Nav.Link></LinkContainer>
                    <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}