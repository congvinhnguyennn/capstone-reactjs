import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Customer/slice/UserSlice"
import seatReducer from "./Customer/slice/BookingSlice"
import movieReducer from "./Admin/Slices/movieSlice"
import theatherReducer from "./Admin/Slices/theaterSlice"



const store = configureStore({
  reducer: {
    userReducer:userReducer,
    movieReducer:movieReducer,
    theatherReducer:theatherReducer,
    seatReducer:seatReducer,
  },
});

export default store;
