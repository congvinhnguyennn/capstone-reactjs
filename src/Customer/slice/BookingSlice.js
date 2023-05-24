import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { seatAPI } from "../apis/showTimesAPI";

export const fetchBookSeats = createAsyncThunk("booking/bookSeats", async (seatList, { rejectWithValue }) => {
  try {
    console.log(seatList);
    const response = await seatAPI(seatList);
    return response.content; // Trả về dữ liệu từ API (nếu cần)
  } catch (error) {
    return rejectWithValue(error.response.data); // Xử lý lỗi nếu có
  }
});

// Khởi tạo slice
const bookingSlice = createSlice({
  name: "booking",
  initialState: { isLoading: false, error: null, selectedSeats: [] },
  reducers: {
    xacNhan(state, action) {
      const seat = action.payload;
      const seatIndex = state.selectedSeats.findIndex((item) => item.tenGhe === seat.tenGhe);
      if (seatIndex === -1) {
        state.selectedSeats.push(seat);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý khi async thunk bắt đầu chạy
      .addCase(fetchBookSeats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Xử lý khi async thunk thành công
      .addCase(fetchBookSeats.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.selectedSeats.forEach((seat) => {
          const seatIndex = state.bookingData.findIndex((item) => item.tenGhe === seat.tenGhe);
          if (seatIndex !== -1) {
            state.bookingData[seatIndex].daDat = true;
          }
        });
        window.location.reload();
      })
      // Xử lý khi async thunk thất bại
      .addCase(fetchBookSeats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export async thunk và reducers để sử dụng
export const { xacNhan } = bookingSlice.actions;
export default bookingSlice.reducer;