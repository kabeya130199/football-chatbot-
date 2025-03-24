import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { AddTicketForm } from "../../components/add-ticket-form/AddTicket.comp"
import { BreadCrumb } from "../../components/breadcrumb/Breadcrumb.comp"
import { shortText } from "../../utils/validation"


const initialFormData = {
    subject:"",
    issueDate:"",
    details:""
}
const initialFormError = {
    subject:false,
    issueDate:false,
    details:false
}

export const AddTicket = () => {

    const [formData, setFormData] = useState(initialFormData);
    const [formErrorData, setFormErrorData] = useState(initialFormError);
    
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setFormErrorData(initialFormError);
        const isSubjectValid = await shortText(formData.subject);

        setFormErrorData({
            ...formErrorData,
            subject: !isSubjectValid
        })
    }


    return (
        <Container>
            <Row>
                <Col>
                    <BreadCrumb page="New Ticket"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddTicketForm handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange} formData={formData} formErrorData={formErrorData}/>
                </Col>
            </Row>
        </Container>
    )
}