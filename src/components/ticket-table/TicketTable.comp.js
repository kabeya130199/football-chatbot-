import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export const TicketTable = ({tickets}) => {
    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subjects</th>
                        <th>Status</th>
                        <th>Opened Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets.length ? tickets.map((ticket) => (
                            <tr key={ticket.id}>
                                
                                <td>{ticket.id}</td>
                                <td><Link to={`/tickets/${ticket.id}`}>{ticket.subject}</Link></td>
                                <td>{ticket.status}</td>
                                <td>{ticket.addedAt}</td>
                            </tr>
                        )) : 
                        <tr>
                            <td colSpan="4" className="text-center">No ticket show</td>
                        </tr>
                    }
                    
                </tbody>
            </Table>
        </div>
    )
}