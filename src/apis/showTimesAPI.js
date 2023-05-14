import axiosClient from "./axiosClient";

export const showtimesAPI = async () => {
  const {data} = await axiosClient.get("/QuanLyRap/LayThongTinLichChieuHeThongRap");

 return data
}

export const bookingAPI = async (MaLichChieu) => {
  const {data} = await axiosClient.get("/QuanLyDatVe/LayDanhSachPhongVe", {
    params: {
      MaLichChieu:MaLichChieu,
    },
  });
  return data
};
export const seatAPI=async()=>{
  const {data} = await axiosClient.post("/QuanLyDatVe/DatVe");
  return data;
}
