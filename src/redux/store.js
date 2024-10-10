import { configureStore } from "@reduxjs/toolkit";
import AnthropicReducer from "../redux/feature/anthropicSlice";
import authReducer from "./feature/authSlice";
export const store = configureStore({
  reducer: {
    anthropic: AnthropicReducer,
    auth: authReducer,
  },
});
