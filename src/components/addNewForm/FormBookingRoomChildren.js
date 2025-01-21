import React, {useState} from "react"
import {Row, Col} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const EditFormBookingRoom = () => {
   const init_data = {
    customerName:"",
    phoneNumber:"",
    roomNumber:"",
    roomCategory:"",
    checkInDateTime:"",
    checkOutDateTime:"",
    period:"",
    price:"",
    amount:""
   }
   const [data, setData] = useState(init_data)
   const [files, setFiles] = useState([])
   const handleOnChange = (e) => {
    let new_data = {...data}
    new_data[e?.target?.name] = e?.target?.value
    setData(new_data)
   }
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
    const addHotelRoom = async (objectId) => {
     if(data?.customerName === ""){
      toast.error("Please enter your name", {position:"top-center"})
      return;
     }
     if(data?.phoneNumber === ""){
      toast.error("Please enter your phone number", {position:"top-center"})
      return;
     }
     if(data?.phoneNumber?.length < 10){
      toast.error("Your phone number must be 10 digits", {position:"top-center"})
      return;
     }
     if(data?.roomNumber === ""){
      toast.error("Please enter your room number", {position:"top-center"})
      return
     }
     if(data?.roomCategory === ""){
      toast.error("Please enter your category", {position:"top-center"})
      return
     }
     if(data?.checkInDateTime === ""){
      toast.error("Please choose your check in date", {position:"top-center"})
      return
     }
     if(data?.checkOutDateTime === ""){
      toast.error("Please choose your check out date", {position:"top-center"})
      return
     }
     if(files?.length === 0){
      toast.error("Please choose your file", {position:"top-center"})
      return 
     }
     if(data?.period === ""){
      toast.error("Please choose your period", {position:"top-center"})
      return
     }
     if(data?.price === ""){
      toast.error("Please enter your price", {position:"top-center"})
      return
     }
     if(data?.amount === ""){
      toast.error("Please choose your amount", {position:"top-center"})
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
         customerName:data?.customerName,
         phoneNumber:data?.phoneNumber,
         roomNumber:data?.roomNumber,
         roomCategory:data?.roomCategory,
         checkInDateTime:data?.checkInDateTime,
         checkOutDateTime:data?.checkOutDateTime,
         period:data?.period,
         files:files,
         price:data?.price,
         amount:parseInt(data?.amount)
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
                     value={data?.customerName}
                     name="customerName"
                     onChange={handleOnChange}
                  />
                </Col>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Phone number</label>
                    <input 
                      type="text" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      value={data?.phoneNumber}
                      name="phoneNumber"
                      onChange={handleOnChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Room number</label>
                    <input 
                      type="text" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      name="roomNumber"
                      value={data?.roomNumber}
                      onChange={handleOnChange}
                    />
                </Col>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Room category</label>
                    <input 
                      type="text" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      name="roomCategory"
                      value={data?.roomCategory}
                      onChange={handleOnChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Reservation startDate</label>
                    <input 
                      type="datetime-local" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      name="checkInDateTime"
                      value={data?.checkInDateTime}
                      onChange={handleOnChange}
                    />
                </Col>
                <Col lg="6">
                    <label className="m-1 text-sm text-gray-500">Reservation endDate</label>
                    <input 
                      type="datetime-local" 
                      className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      name="checkOutDateTime"
                      value={data?.checkOutDateTime}
                      onChange={handleOnChange}
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
                      name="period"
                      value={data?.period}
                      onChange={handleOnChange}
                    />
                </Col>
            </Row>
            <Row>
              <Col lg="6">
                <label className="m-1 text-sm text-gray-500">Price check</label>
                <input 
                  type="text" 
                  className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  name="price"
                  value={data?.price}
                  onChange={handleOnChange}
                />
              </Col>
              <Col lg="6">
                <label className="m-1 text-sm text-gray-500">Amount</label>
                <input 
                  type="number" 
                  className="block rounded-t-lg px-2 pb-2 pt-2 m-1 w-full text-sm text-white bg-purple-500 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  name="amount"
                  value={data?.amount}
                  onChange={handleOnChange}
                />
              </Col>
            </Row>
            <div className="d-flex justify-center">
               <button 
                 type="button" 
                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-2"
                 onClick={addHotelRoom}
                >
                  Apply
               </button>
            </div>
        </div>
    )
}

export default EditFormBookingRoom