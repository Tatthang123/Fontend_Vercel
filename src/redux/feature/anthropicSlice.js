import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import toast from "react-hot-toast";

const initialState = {
  response: null,
  error: "",
  loading: false,
};

export const createComponent = createAsyncThunk(
  "anthropic/createComponent",
  async ({ input }, { rejectWithValue }) => {
    try {
      console.log("inputcreateComponent ne ", input);
      const response = await api.generateCode(input);
      toast.success("createComponent Successfully");

      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

const anthropicSlice = createSlice({
  name: "anthropic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComponent.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createComponent.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload.data.response;
    });
    builder.addCase(createComponent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { setToken } = anthropicSlice.actions;

export default anthropicSlice.reducer;
