import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
import toast from 'react-hot-toast'

const initialState = {
  token: null,
  error: '',
  loading: false
}
export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      console.log("formValue create", formValue)
      const response = await api.login(formValue)
      toast.success('Login Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      toast.error(err.response.data.message)
      return rejectWithValue(err.response.data)
    }
  }
)
// export const googleLogin = createAsyncThunk(
//   'auth/googleLogin',
//   async ({ email, googleId, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.googleLogin(email, googleId)
//       toast.success('Login Successfully')
//       navigate('/')
//       return response.data
//     } catch (err) {
//       toast.error(err.response.data.message)
//       return rejectWithValue(err.response.data)
//     }
//   }
// )
// setUser
// export const register = createAsyncThunk(
//   'auth/register',
//   async ({ formValue, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.register(formValue)
//       toast.success('Register Successfully')
//       navigate('/')
//       return response.data
//     } catch (err) {
//       toast.error(err.response.data.message)
//       return rejectWithValue(err.response.data)
//     }
//   }
// )

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async ({ navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.logout()
//       toast.success('Logout Successfully')
//       navigate('/')
//       window.location.reload()
//       return response.data
//     } catch (err) {
//       toast.error(err.response.data.message)
//       return rejectWithValue(err.response.data)
//     }
//   }
// )

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('accessToken'); // Xóa token khi đăng xuất
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const accessToken = action.payload.data.access_token;
        console.log('fix', action.payload)
        // Lưu accessToken vào localStorage
        localStorage.setItem('accessToken', accessToken);
        console.log("acesstoken", accessToken)
        // Lưu accessToken vào Redux store
        state.token = accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
// Action creators are generated for each case reducer function
export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer

