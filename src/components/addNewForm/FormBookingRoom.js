import React, {useState, useEffect} from "react"
import {Row, Col, Nav, Tab, Table} from "react-bootstrap"
import FormBookingRoomChildren from "./FormBookingRoomChildren"
import {Button, Select} from "flowbite-react"
import moment from "moment"
import {useNavigate} from "react-router-dom"
const FormBookingRoom = () => {
    const [selectRooms, setSelectRooms] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
     getAllCustomerName()
    },[])
    const getAllCustomerName = async () => {
      let res = await fetch("https://parseapi.back4app.com/classes/bookingRoom", {
        headers:{
         "Content-Type":"application/json",
         "X-Parse-Application-Id":"8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
         "X-Parse-REST-API-Key":"d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
        }
       })
       let selectRoomList = await res?.json()
       let resultSelectRoomList = await selectRoomList?.results
       setSelectRooms(resultSelectRoomList)
    }
    const handleOnFilter = async (e) => {
     let whereQuery = JSON.stringify({customerName:e?.target?.value})
     let res = await fetch(`https://parseapi.back4app.com/classes/bookingRoom?where=${encodeURIComponent(whereQuery)}`,{
      headers:{
       "Content-Type":"application/json",
       "X-Parse-Application-Id":"8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
       "X-Parse-REST-API-Key":"d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
      }
     })
     let results = await res?.json()
     let filterResult = await results?.results
     let filterId = await filterResult?.map((i) => i?.objectId)
     localStorage.getItem(`check_${filterId}`)
     setSelectRooms(filterResult)
    }
    let id = [...new Set(selectRooms?.flatMap((i) => i?.objectId || []))]
    localStorage.setItem(`check_id`, id)
    return (
        <Tab.Container defaultActiveKey="add">
            <Row className="p-2">
                <Col lg="4">
                    <Nav className="wrapper flex-column" variant="pills">
                      <Nav.Item>
                         <Nav.Link eventKey="add" className="btn-addNew">Add</Nav.Link>
                      </Nav.Item>
                       <Nav.Item>
                         <Nav.Link eventKey="search_room" className="btn-view">
                          <Select onChange={handleOnFilter}>
                            {selectRooms?.length > 0 && selectRooms?.map((i) => {
                              return(
                               <option value={i?.customerName} key={i?.objectId}>{i?.customerName}</option>
                              )
                             })
                            } 
                          </Select>
                         </Nav.Link>
                       </Nav.Item>
                       <Button color="failure" className="btn-reset" onClick={getAllCustomerName}>Reset hotel room list</Button>
                    </Nav>
                </Col>
                <Col lg="8">
                  <Tab.Content>
                    <Tab.Pane eventKey="add">
                       <FormBookingRoomChildren/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="search_room">
                       <Table striped hover bordered responsive>
                         <thead>
                           <tr>
                             <th className="text-center text-nowrap">Customer name</th>
                             <th className="text-cente text-nowrap">Room number</th>
                             <th className="text-center text-nowrap">Room category</th>
                             <th className="text-center">Amount</th>
                             <th className="text-center">Price</th>
                             <th className="text-center text-nowrap">Check-in time</th>
                             <th className="text-center text-nowrap">Check-out time</th>
                             <th className="text-center">Total</th>
                             <th className="text-center">Action</th>
                           </tr>
                         </thead>
                         <tbody>
                           {selectRooms?.length > 0 && selectRooms?.map((i, index) => {
                             return(
                              <tr key={index}>
                                <td className="text-center text-primary align-middle text-nowrap">{i?.customerName}</td>
                                <td className="text-center text-warning align-middle">{i?.roomNumber}</td>
                                <td className="text-center text-primary text-nowrap align-middle">{i?.roomCategory}</td>
                                <td className="text-center text-secondary align-middle">{i?.amount}</td>
                                <td className="text-center text-danger align-middle">{"$" + i?.price}</td>
                                <td className="text-center text-secondary text-nowrap align-middle">{moment(i?.checkInDateTime).format("DD/MM/YYYY hh:mm:A")}</td>
                                <td className="text-center text-secondary text-nowrap align-middle">{moment(i?.checkOutDateTime).format("DD/MM/YYYY hh:mm:A")}</td>
                                <td className="text-center text-success align-middle">{"$" + i?.amount * i?.price}</td>
                                <td className="text-center text-nowrap">
                                  <Button onClick={() => navigate(`/hotel/room/history/${i?.objectId}`)}>View hotel room history</Button>
                                </td>
                              </tr>
                             )
                            })
                           }
                         </tbody>
                       </Table>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default FormBookingRoom