import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookSeats } from '../../slice/BookingSlice';
import { bookingAPI } from '../../apis/showTimesAPI';
import style from './Booking.module.scss';

function Booking({ maLichChieu }) {
  const dispatch = useDispatch();
  const [booking, setBooking] = useState({});
  const bookingData = useSelector(state => state.booking);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getBooking = async () => {
    try {
      const data = await bookingAPI(maLichChieu);
      setBooking(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  const handleSeatClick = (seat) => {
    const updatedSeats = [...selectedSeats];
    if (updatedSeats.includes(seat)) {
      updatedSeats.splice(updatedSeats.indexOf(seat), 1);
    } else {
      updatedSeats.push(seat);
    }
    setSelectedSeats(updatedSeats);
  };

  const handleBooking = () => {
  const seatList = selectedSeats.map((seat) => ({
    maGhe: seat.maGhe,
    giaVe: seat.loaiGhe === "Vip" ? 120000 : 70000
  }));

  const requestData = {
    maLichChieu: maLichChieu,
    danhSachVe: seatList
  };

  dispatch(fetchBookSeats(requestData));
};
const sum = selectedSeats.reduce((total, seat) => {
  const seatPrice = seat.loaiGhe === "Vip" ? 120000 : 70000;
  return total + seatPrice;
}, 0);

  return (
    <div className='container'>
      <div className='row'>
        <div className=' col-7 mt-4'>
          {booking && booking.danhSachGhe && booking.danhSachGhe.map((seat) => (
            <button
              key={seat.tenGhe}
              className={`${style.seat} ${seat.daDat ? style.full : selectedSeats.includes(seat) ? style.selected : style.empty} `}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.daDat}
            >
              {seat.tenGhe}
            </button>
          ))}
        </div>
        <div className=' col-5 mt-4'>      
        <table style={{borderCollapse: "collapse"}}>
        <thead>
            <tr>
                <th style={{border: "1px solid black", padding: "5px"}}>Số ghế</th>
                <th style={{border: "1px solid black", padding: "5px"}}>Loại ghế</th>
                <th style={{border: "1px solid black", padding: "5px"}}>Giá</th>
            </tr>
        </thead>
        <tbody>
            {selectedSeats.map((item,index)=>{
                return <tr key={index}>
                    <td style={{border: "1px solid black", padding: "5px"}}>{item.tenGhe}</td>
                    <td style={{border: "1px solid black", padding: "5px"}}>{item.loaiGhe}</td>
                    <td style={{border: "1px solid black", padding: "5px"}}>{item.loaiGhe === "Vip" ? 120000 : 70000}</td>
                </tr>
            })} 
        </tbody>
    </table>
    <p>Tổng tiền:{sum}VND </p>
     <button onClick={handleBooking} className="btn btn-success">
            Đặt vé
      </button>
    </div>
      </div>
    </div>
  );
}

export default Booking;