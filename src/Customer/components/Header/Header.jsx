import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./../../slice/UserSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentUser = useSelector((state) => state.userReducer.user);
  const { isAuth } = useSelector((state) => state.userReducer);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <header className="header">
      <nav class="bg-gray-900 w-full z-20 top-0 left-0 h-[150px]">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="navbar-brand" to="/">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Movies</span>
          </Link>
          <div class="flex md:order-2">
            {isAuth ? (
              <>
                <span className="navbar-text me-3 text-white">
                  Xin chào, {currentUser && currentUser.taiKhoan}
                </span>
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-primary me-2" to="/signin">
                  Đăng nhập
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  Đăng kí
                </Link>
              </>
            )}
            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setIsOpen(!isOpen)}>
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div class={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : ""}`} id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900">
              <li>
                <a href="#lichChieu" class="text-decoration-none block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0" aria-current="page">Lịch chiếu</a>
              </li>
              <li>
                <a href="#" class="text-decoration-none block py-2 pl-3 pr-4 text-white rounded md:hover:bg-transparent md:hover:text-white md:p-0">Cụm rạp</a>
              </li>
              <li>
                <a href="#" class="text-decoration-none block py-2 pl-3 pr-4 text-white rounded md:hover:bg-transparent md:hover:text-white md:p-0 ">Tin tức</a>
              </li>
              <li>
                <a href="#" class="text-decoration-none block py-2 pl-3 pr-4 text-white rounded md:hover:bg-transparent md:hover:text-white md:p-0">Ứng dụng</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;