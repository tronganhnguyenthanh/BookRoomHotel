import {Card} from "flowbite-react"
import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import moment from "moment"
const ViewDetailHotelRoomList = () => {
  const [viewHotelRoomDetail, setViewHotelRoomDetail] = useState({})
  const {objectId} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
   getHotelRoomDetail(objectId)
  },[objectId])
  const getHotelRoomDetail = async (objectId) => {
   const viewRoomDetail = await fetch(`https://parseapi.back4app.com/classes/bookingRoom/${objectId}`, {
     headers:{
      "Content-Type":"application/json",
      "X-Parse-Application-Id":"8Sl7RTqKI34etawn9SEAVhNzuuGLwaBoVRpE9qeF",
      "X-Parse-REST-API-Key":"d5VvkwjrD3Zrb40PSkJXEZ1Udmw0r4U4xPVg5kEv"
     },
   })
   let res = await viewRoomDetail?.json()
   setViewHotelRoomDetail(res)
  }
  const bookHotelRoom = () => {
    navigate(`/hotel/room/history/${objectId}`)
  }
  return (
   <div className="p-2">
    <Card className="w-80 m-auto">
      <img src={viewHotelRoomDetail?.files} alt=""/>
      <h2 className="text-center text-green-300">{viewHotelRoomDetail?.roomCategory}</h2>
      <div className="text-center text-gray-500">{viewHotelRoomDetail?.customerName}</div>
      <div className="text-center text-amber-500">{moment(viewHotelRoomDetail?.checkInDateTime).format("DD/MM/YYYY hh:mm:A")}</div>   
      <div className="text-center text-amber-900">{moment(viewHotelRoomDetail?.checkOutDateTime).format("DD/MM/YYYY hh:mm:A")}</div>
      <p className="text-center text-emerald-600">{"$" + viewHotelRoomDetail?.price}</p>
      <div className="flex justify-center">
        <button type="button" className="bg-blue-700 p-2 text-white rounded-lg m-2" onClick={bookHotelRoom}>Book a room</button>
        <button type="button" className="bg-gray-500 p-2 text-white rounded-lg m-2" onClick={() => navigate("/hotel/room/list")}>Go back</button>
      </div>
    </Card>
   </div>
  )
}

export default ViewDetailHotelRoomList