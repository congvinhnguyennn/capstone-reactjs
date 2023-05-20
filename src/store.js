import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Customer/slice/UserSlice"
import movieReducer from "./Admin/Slices/movieSlice"
import theatherReducer from "./Admin/Slices/theaterSlice"
import customerReducer from "./Admin/Slices/customerSlice"


const store = configureStore({
  reducer: {
    userReducer:userReducer,
    movieReducer:movieReducer,
    theatherReducer:theatherReducer,
    userAdminReducer:customerReducer,
  },
});

export default store;
