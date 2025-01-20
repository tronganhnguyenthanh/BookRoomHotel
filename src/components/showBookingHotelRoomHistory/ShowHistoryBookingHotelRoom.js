import {Button, Modal} from "flowbite-react"
import moment from "moment"
import React, {useEffect, useState} from "react"
import {Table} from "react-bootstrap"
import {HiOutlineExclamationCircle} from "react-icons/hi"
import {useNavigate, useParams} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const ShowHistoryBookingHotelRoom = () => {
  const [history, setHistory] = useState({})
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const {objectId} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
   showHotelRoomHistory(objectId)
   const savedCheck = localStorage.getItem(`check_${objectId}`); // Convert string to boolean
   setIsConfirm(savedCheck)
  },[objectId])
  const showHotelRoomHistory = async (objectId) => {
    const viewHistory = await fetch(`https://parseapi.back4app.com/classes/bookingRoom/${objectId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
        "X-Parse-REST-API-Key": "d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
      },
    })
    let res = await viewHistory?.json()
    setHistory(res)
  }
  const showConfirmHotelBookingRoom = () => {
   setIsOpenModal(!isOpenModal)
  }
  const confirmHotelBookingRoom = () => {
   localStorage.setItem(`check_${objectId}`, !isConfirm)
   setIsConfirm(localStorage.getItem(`check_${objectId}`))
   toast?.success(`Your ${history?.roomCategory} has been checked in`, {position:"top-center"})
   showConfirmHotelBookingRoom()
  }
  const removeHotelBookingRoom = () => {
   setIsConfirm(localStorage.removeItem(`check_${objectId}`))
   toast?.success(`You have checked out for the ${history?.roomCategory}`, {position:"top-center"})
   setIsOpenModal(false)
  }
  const updateHistory = (objectId) => {
   navigate(`/hotel/edit/${objectId}`)
  }
  return (
    <div className="p-2">
      <ToastContainer />
      <Table responsive striped bordered className="my-60">
        <thead>
          <tr>
            <th className="text-center whitespace-nowrap">Customer's name</th>
            <th className="text-center whitespace-nowrap">Room category</th>
            <th className="text-center whitespace-nowrap">Room number</th>
            <th className="text-center whitespace-nowrap">Check in</th>
            <th className="text-center whitespace-nowrap">Check out</th>
            <th className="text-center whitespace-nowrap">Amount</th>
            <th className="text-center whitespace-nowrap">Price</th>
            <th className="text-center whitespace-nowrap">Total</th>
            <th className="text-center whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center text-primary align-middle text-nowrap">{history?.customerName}</td>
            <td className="text-center text-info align-middle whitespace-nowrap">{history?.roomCategory}</td>
            <td className="text-center text-secondary align-middle">{history?.roomNumber}</td>
            <td className="text-center text-secondary align-middle whitespace-nowrap">{moment(history?.checkInDateTime).format("DD/MM/YYYY hh:mm:A")}</td>
            <td className="text-center text-secondary align-middle whitespace-nowrap">{moment(history?.checkOutDateTime).format("DD/MM/YYYY hh:mm:A")}</td>
            <td className="text-center text-secondary align-middle">{history?.amount}</td>
            <td className="text-center text-success align-middle">{"$" + history?.price}</td>
            <td className="text-center text-success align-middle">{"$" + history?.price * history?.amount}</td>
            <td className="flex justify-center text-nowrap">
              {
                !isConfirm 
                ? 
                <Button color="blue" onClick={showConfirmHotelBookingRoom}>Check in</Button> 
                : 
                <Button color="failure" onClick={removeHotelBookingRoom}>Check out</Button>
              }
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal show={isOpenModal} onClose={() => setIsOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h2 className="text-red-700">Do you want to book this room ?</h2>
            <div className="flex justify-center gap-4">
              <Button color="purple" onClick={confirmHotelBookingRoom}>Yes</Button>
              <Button color="gray" onClick={showConfirmHotelBookingRoom}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex justify-end">
        <Button className="m-2" onClick={() => navigate(`/hotel/detail/${history?.objectId}`)}>Back</Button>
        <Button color="purple" className="m-2" onClick={() => updateHistory(objectId)}>Update history</Button>
      </div>
    </div>
  )
}

export default ShowHistoryBookingHotelRoom