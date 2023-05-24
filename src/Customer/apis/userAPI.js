import axiosClient from "./axiosClient";

export const APIlogin=async(values)=>{
    console.log(values);
    const {data}= await axiosClient.post("QuanLyNguoiDung/DangNhap",values);
    return data;
}

export const APIsignup=async(values)=>{
    const payload={...values,maNhom:"GP08"}
    const {data}= await axiosClient.post("QuanLyNguoiDung/DangKy",values);
    return data;
}