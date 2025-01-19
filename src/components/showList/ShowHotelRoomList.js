import {Card, Button} from "flowbite-react"
import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const ShowHotelRoomList = () => {
  const [showHotelRoomList, setHotelRoomList] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
   getHotelRoomList()
  },[])
  const getHotelRoomList = async () => {
   let res = await fetch("https://parseapi.back4app.com/classes/bookingRoom", {
    headers:{
     "Content-Type":"application/json",
     "X-Parse-Application-Id":"8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
     "X-Parse-REST-API-Key":"d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
    }   
   })
   let list = await res?.json()
   let resultHotelRoomList = await list?.results
   setHotelRoomList(resultHotelRoomList)
  }
  const deleteHotelRoom = async (objectId) => {
    let deleteConfirm = window.confirm(`Do you want to delete this room with id_${objectId} ?`)
    if(deleteConfirm){
     await fetch(`https://parseapi.back4app.com/classes/bookingRoom/${objectId}`, {
      method:"DELETE",
      headers:{
       "Content-Type":"application/json",
       "X-Parse-Application-Id":"8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
       "X-Parse-REST-API-Key":"d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
      }   
     })
     toast?.success("Room deleted successfully", {position:"top-center"})
     getHotelRoomList()
   }
  }
  return (
   <div>
     <ToastContainer/>
     <div className="flex justify-start">
       <Button className="m-2" onClick={() => navigate("/")}>Back</Button>
     </div>
     <h1 className="text-3xl text-center text-pink-500">Show hotel room list</h1>
     {showHotelRoomList?.length > 0 && showHotelRoomList?.map((i) => {
       return(
        <details key={i?.objectId} className="m-2">
          <summary className="text-xl text-violet-900 text-center">{i?.roomCategory}</summary>
          <Card className="w-80 m-auto">
            <img src={i?.files} alt="" className="cursor-pointer" onClick={() => navigate(`/hotel/detail/${i?.objectId}`)}/>
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => deleteHotelRoom(i?.objectId)}>Delete</button>
          </Card>
        </details>
       )
     })
     }
   </div>
  )
}

export default ShowHotelRoomList