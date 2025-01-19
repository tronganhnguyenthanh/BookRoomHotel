import {Route, Routes} from "react-router-dom";
import FormBookingRoom from "../components/addNewForm/FormBookingRoom";
import ShowHotelRoomList from "../components/showList/ShowHotelRoomList";
import ViewDetailHotelRoomList from "../components/showList/ViewDetailHotelRoomList";
import ShowHistoryBookingHotelRoom from "../components/showBookingHotelRoomHistory/ShowHistoryBookingHotelRoom";
const App = () => {
 return (
  <div className="App">
     <Routes>
       <Route path="/" element={<FormBookingRoom/>}/>
       <Route path="/hotel/room/list" element={<ShowHotelRoomList/>}/>
       <Route path="/hotel/detail/:objectId" element={<ViewDetailHotelRoomList/>}/>
       <Route path="/hotel/room/history/:objectId" element={<ShowHistoryBookingHotelRoom/>}/>
     </Routes>
  </div>
 );
}

export default App;
