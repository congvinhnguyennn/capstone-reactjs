import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee,fas } from '@fortawesome/free-solid-svg-icons'
 library.add(fab, faCheckSquare, faCoffee,fas)
// import MovieDetails from "./modules/MovieDetails/Showtimes/MovieDetails";
// import Singin from "./modules/Auth/Signin/Singin";
// import Signup from "./modules/Auth/Signup/Signup";
// import Booking from "./modules/Booking/Booking";
// import Home from "./modules/Home/Home";
const Home=lazy(() => import("./modules/Home/Home"));
const MovieDetails=lazy(() => import("./modules/MovieDetails/Showtimes/MovieDetails"));
const Singin=lazy(() => import("./modules/Auth/Signin/Singin"));
const Signup=lazy(() => import("./modules/Auth/Signup/Signup"));
const Booking=lazy(() => import("./modules/Booking/Booking"));
function App() {
  return (
  <Suspense fallback={<h1>loading...</h1>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetails/>} />
          <Route path="/booking/:bookingId" element={<ProtectedRoute>
            <Booking/>
          </ProtectedRoute>}/>
        </Route>
        <Route path="/" element={<AuthLayout/>}>
          <Route path="/signin" element={<Singin/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </Suspense>
  );
}

export default App;
