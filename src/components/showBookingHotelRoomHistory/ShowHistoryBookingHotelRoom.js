import {Button} from "flowbite-react"
import moment from "moment"
import React, {useEffect, useState} from "react"
import {Table} from "react-bootstrap"
import {useNavigate, useParams} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const ShowHistoryBookingHotelRoom = () => {
  const [history, setHistory] = useState({})
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
      headers:{
       "Content-Type":"application/json",
       "X-Parse-Application-Id":"8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
       "X-Parse-REST-API-Key":"d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
      },
    })
    let res = await viewHistory?.json()
    setHistory(res)
  }
  const confirmHotelBookingRoom = () => {
   let check = window.confirm("Do you want to book this room ?")
   if(check){
    localStorage.setItem(`check_${objectId}`, !isConfirm)
    setIsConfirm(localStorage.getItem(`check_${objectId}`))
    toast?.success(`Your ${history?.roomCategory} has been booked`)
   }else{
     setIsConfirm(localStorage.removeItem(`check_${objectId}`))
   }
  }
  return (
   <div className="p-2">
    <ToastContainer/>
    <Table responsive striped bordered className="my-60">
      <thead>
        <tr>
          <th className="text-center whitespace-nowrap">Customer's name</th>
          <th className="text-center whitespace-nowrap">Room category</th>
          <th className="text-center whitespace-nowrap">Room number</th>
          <th className="text-center whitespace-nowrap">Check in</th>
          <th className="text-center whitespace-nowrap">Check out</th>
          <th className="text-center whitespace-nowrap">Price</th>
          <th className="text-center whitespace-nowrap">Action</th>
        </tr>  
      </thead>
      <tbody>
        <tr>
          <td className="text-center text-primary align-middle">{history?.customerName}</td>   
          <td className="text-center text-info align-middle whitespace-nowrap">{history?.roomCategory}</td>   
          <td className="text-center text-secondary align-middle">{history?.roomNumber}</td>   
          <td className="text-center text-secondary align-middle whitespace-nowrap">{moment(history?.checkInDateTime).format("DD/MM/YYYY hh:mm:A")}</td>   
          <td className="text-center text-secondary align-middle whitespace-nowrap">{moment(history?.checkOutDateTime).format("DD/MM/YYYY hh:mm:A")}</td>
          <td className="text-center text-success align-middle">{history?.price}</td>
          <td className="flex justify-center">
           {
             isConfirm 
             ? 
             <button 
               type="button" 
               className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
               onClick={confirmHotelBookingRoom}
               >
                Booked
             </button>
             :
             <button 
               type="button" 
               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
               onClick={confirmHotelBookingRoom}
              >
                 Book
              </button>
            }
          </td>
        </tr>
      </tbody>
    </Table>
    <div className="flex justify-end">
      <Button className="m-2" onClick={() => navigate(`/hotel/detail/${history?.objectId}`)}>Back</Button>
    </div>
   </div>
  )
}

export default ShowHistoryBookingHotelRoom