import React, {useState} from "react"
import {Row, Col} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const FormBookingRoomChildren = () => {
    const [customerName, setCustomerName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [roomNumber, setRoomNumber] = useState("")
    const [roomCategory, setRoomCategory] = useState("")
    const [checkInDateTime, setCheckInDateTime] = useState("")
    const [checkOutDateTime, setCheckOutDateTime] = useState("")
    const [period, setPeriod] = useState("")
    const [price, setPrice] = useState("")
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const uploadImage = (e) => {
     let imageUpload = e?.target?.files[0]
     let reader = new FileReader()
     reader.onloadend = () => {
      setFiles(reader?.result)
     }
     if(files){
      reader?.readAsDataURL(imageUpload)
     }
    }
    const addHotelRoom = async () => {
     if(customerName === ""){
      toast.error("Please enter your name", {position:"top-center"})
      return;
     }
     if(phoneNumber === ""){
      toast.error("Please enter your phone number", {position:"top-center"})
      return;
     }
     if(phoneNumber?.length < 10){
      toast.error("Your phone number must be 10 digits", {position:"top-center"})
      return;
     }
     if(roomNumber === ""){
      toast.error("Please enter your room number", {position:"top-center"})
      return
     }
     if(roomCategory === ""){
      toast.error("Please enter your category", {position:"top-center"})
      return
     }
     if(checkInDateTime === ""){
      toast.error("Please choose your check in date", {position:"top-center"})
      return
     }
     if(checkOutDateTime === ""){
      toast.error("Please choose your check out date", {position:"top-center"})
      return
     }
     if(files?.length === 0){
      toast.error("Please choose your file", {position:"top-center"})
      return 
     }
     if(period === ""){
      toast.error("Please choose your period", {position:"top-center"})
      return
     }
     if(price === ""){
      toast.error("Please enter your price", {position:"top-center"})
      return
     }else{
       await fetch("https://parseapi.back4app.com/classes/bookingRoom", {
        method:"POST",
        headers:{
         "Content-Type":"application/json",
         "X-Parse-Application-Id":"8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
         "X-Parse-REST-API-Key":"d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
        },
        body:JSON.stringify({
         customerName:customerName,
         phoneNumber:phoneNumber,
         roomNumber:roomNumber,
         roomCategory:roomCategory,
         checkInDateTime:checkInDateTime,
         checkOutDateTime:checkOutDateTime,
         period:period,
         files:files,
         price:price
        })
       })
       toast?.success("Room added successfully", {position:"top-center"})
       navigate("/hotel/room/list")
     }
    }
    return (
        <div className="right-layout">
            <ToastContainer/>
            <Row>
                <Col lg="6">
                   <label className="m-1 text-sm text-gray-500">Customer's name</label>
                   <input 
                     type="text" 
                     className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                     onChange={(e) => setCustomerName(e?.target?.value)}
                  />
                </Col>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Phone number</label>
                    <input 
                      type="text" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      onChange={(e) => setPhoneNumber(e?.target?.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Room number</label>
                    <input 
                      type="text" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      onChange={(e) => setRoomNumber(e?.target?.value)}
                    />
                </Col>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Room category</label>
                    <input 
                      type="text" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      onChange={(e) => setRoomCategory(e?.target?.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Reservation startDate</label>
                    <input 
                      type="datetime-local" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      onChange={(e) => setCheckInDateTime(e?.target?.value)}
                    />
                </Col>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Reservation endDate</label>
                    <input 
                      type="datetime-local" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      onChange={(e) => setCheckOutDateTime(e?.target?.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <div className="relative">
                        <label className="m-1 text-sm text-gray-500">Upload image</label>
                        <input 
                          type="file" 
                          className="block rounded-t-lg m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                          onChange={uploadImage}
                        />
                    </div>
                </Col>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Stay date</label>
                    <input 
                      type="number" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      onChange={(e) => setPeriod(e?.target?.value)}
                    />
                </Col>
            </Row>
            <Row>
              <Col lg="6">
                <label className="m-1 text-sm text-gray-500">Price check</label>
                <input 
                  type="text" 
                  className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  onChange={(e) => setPrice(e?.target?.value)}
                />
              </Col>
            </Row>
            <div className="d-flex justify-center">
               <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-2" onClick={addHotelRoom}>Apply</button>
            </div>
        </div>
    )
}

export default FormBookingRoomChildren