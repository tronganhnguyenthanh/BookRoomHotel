import React from "react"
import {Row, Col, Nav, Tab} from "react-bootstrap"
import FormBookingRoomChildren from "./FormBookingRoomChildren"
const FormBookingRoom = () => {
    return (
        <Tab.Container defaultActiveKey="add">
            <Row className="p-2">
                <Col lg="4">
                    <Nav className="wrapper flex-column" variant="pills">
                      <Nav.Item>
                         <Nav.Link eventKey="add" className="btn-addNew">Add</Nav.Link>
                      </Nav.Item>
                    </Nav>
                </Col>
                <Col lg="8">
                    <Tab.Content>
                        <Tab.Pane eventKey="add">
                          <FormBookingRoomChildren/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default FormBookingRoom