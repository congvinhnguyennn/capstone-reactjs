import React from 'react'
import styles from './Header.module.scss'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {logout} from './../../slice/UserSlice'
import { useNavigate } from 'react-router-dom';
function Header() {
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const currentUser=useSelector((state)=>state.userReducer.user)
 const {isAuth } = useSelector((state) => state.userReducer);
 const handleLogout=()=>{
  dispatch(logout())
  localStorage.removeItem("user")
 }
  return (
    <header className='header'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white justify-content-around">
        <div onClick={()=>{navigate(`/`)}} className='collapse navbar-collapse justify-content-around'><a className="navbar-brand opacity-100" href="#">Movies</a></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
  <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarText">
    <ul className="navbar-nav ">
      <li className="nav-item active">
        <a className="nav-link" href="#">Lịch chiếu</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Cụm rạp</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Tin tức</a>
      </li>
       <li className="nav-item">
        <a className="nav-link" href="#">Ứng dụng</a>
      </li>
    </ul>
   
  </div>
  <div className='collapse navbar-collapse justify-content-center'>
    <ul className='navbar-nav'>
        {isAuth ? (
          <>
            <li className='nav-item py-1'>Xin chào, {currentUser && currentUser.taiKhoan}</li>
            <li className={styles.divider}></li>
            <li>
              <button className='btn btn-danger nav-item' onClick={handleLogout}>Đăng xuất</button>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item'>
              <Link className='nav-link' to="/signin">Đăng nhập</Link>
            </li>
             <li className={styles.divider}></li>
            <li className='nav-item'>
              <Link className='nav-link' to="/signup">Đăng kí</Link>
            </li>
          </>)
        }
    </ul>
  </div>
</nav>
    </header>
  )
}

export default Header