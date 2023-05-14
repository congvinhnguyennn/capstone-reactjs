import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice"
const store = configureStore({
  reducer: {
    userReducer:userReducer,
  
  },
});

export default store;
