import { Container, Row, Col, Button } from "react-bootstrap"
import { BreadCrumb } from "../../components/breadcrumb/Breadcrumb.comp"
import { MessageHistory } from "../../components/message-history/MessageHistory.comp"
import tickets from "../../assets/data/dummy-ticket.json"
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types'
//const ticket = tickets[0];

export const Ticket = () => {
    
    const {tid} = useParams();
    const ticket = tickets[tid-1];
    console.log(ticket)
    const [updateMsg, setUpdateMessage] = useState("");

    const handleOnChange = (e) => {
        setUpdateMessage(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        alert("submit ok")
    }

    return (
        <Container>
            <Row>
                <Col>
                    <BreadCrumb page = "Ticket"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="subject">Subject: {ticket.subject}</div>
                    <div className="subject">Date: {ticket.addedAt}</div>
                    <div className="subject">Status: {ticket.status}</div>
                </Col>
                <Col className="text-end">
                    <Button variant="outline-info">Close Ticket</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    {ticket.history && <MessageHistory msg={ticket.history}/>}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <UpdateTicket 
                        msg={updateMsg} 
                        handleOnChange={handleOnChange} 
                        handleOnSubmit={handleOnSubmit} 
                    />
                </Col>
            </Row>
        </Container>
    )
}

