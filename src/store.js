import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice"
import seatReducer from "./slice/BookingSlice"
const store = configureStore({
  reducer: {
    userReducer:userReducer,
    seatReducer:seatReducer
  },
});

export default store;
