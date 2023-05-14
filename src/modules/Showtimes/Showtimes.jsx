import React, { useState, useEffect } from 'react'
import { showtimesAPI } from '../../apis/showTimesAPI';
import styles from './Showtimes.module.scss';
import {Link} from 'react-router-dom'

function Showtimes({ movieId }) {
  const [booking, setBooking] = useState([]);

  const getBooking = async () => {
    try {
      const data = await showtimesAPI();
      setBooking(data.content);
    } catch (error) {
      console.log(error);
    }
  };
const convertId=parseFloat(movieId)
  useEffect(() => {
    getBooking();
  }, []);

  // Sử dụng filter để lọc các phim theo movieId
const filteredBooking = booking.flatMap((item) =>
  item.lstCumRap.flatMap((cumRap) =>
    cumRap.danhSachPhim.filter((phim) => phim.maPhim === convertId)
      .flatMap((phim) => (
        phim.lstLichChieuTheoPhim.map((lichChieu)=>({maLichChieu: lichChieu.maLichChieu,
        ngayChieu: lichChieu.ngayChieuGioChieu,
        diaChi: cumRap.diaChi,
        hinhAnh: cumRap.hinhAnh,
        maCumRap: cumRap.maCumRap,
        tenCumRap: cumRap.tenCumRap,}))
      ))
  )
);
console.log(filteredBooking);
console.log(booking);
const showtimesList = filteredBooking.map((showtime) => (
  <div key={showtime.maLichChieu}>
    <h4>{showtime.tenCumRap}</h4>
    <p>Địa chỉ: {showtime.diaChi}</p>
    <p>Ngày chiếu: {showtime.ngayChieuGioChieu}</p>
    {/* Thêm các thông tin về suất chiếu ở đây */}
    <Link to={`/booking/${showtime.maLichChieu}`}>Đặt vé</Link>
  </div>
));
  return (
    <div>
      <h3 className={styles.titl}>Suất chiếu</h3>
      <div className={styles.showtimes}>
       {showtimesList}
      </div>
    </div>
  );
}

export default Showtimes;
