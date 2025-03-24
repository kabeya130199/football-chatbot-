import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BreadCrumb } from "../../components/breadcrumb/Breadcrumb.comp"
import { SearchForm } from "../../components/search-form/SearchForm.comp"
import { TicketTable } from "../../components/ticket-table/TicketTable.comp"
import tickets from "../../assets/data/dummy-ticket.json"
import { Link } from "react-router-dom"

export const TicketList = () => {

    
    const [str, setStr] = useState("");
    const [dispTicket, setDispTicket] = useState(tickets);
    
    useEffect(() => {
        searchTicket(str);
    }, [str]);
    
    const handleOnChange = (e) => {

        setStr(e.target.value);
        
    }

    const searchTicket = (str) => {
        const dispTicket = tickets.filter(row => row.status.toLowerCase().includes(str.toLowerCase()));
        setDispTicket(dispTicket);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <BreadCrumb page="Ticket Lists" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Link to="/add-ticket">
                        <Button variant="info">Add New Ticket</Button>
                    </Link>
                </Col>
                <Col>
                    <SearchForm handleOnChange={handleOnChange} str={str}/>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <TicketTable tickets={dispTicket} />
                </Col>
            </Row>
        </Container>
        
    )
    
}