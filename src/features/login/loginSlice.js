import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isUserNameValid: false,
  isPasswordValid: false,
  isAuthSuccess: false,
};

export const asyncAuth = createAsyncThunk("login/auth", (email, password) =>
  fetch("https://reqres.in/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json())
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkUserName: (state, action) => {
      //   if (action.payload.length > 3) {
      //     state.isUserNameValid = true;
      //   } else {
      //     state.isUserNameValid = false;
      //   }

      state.isUserNameValid = action.payload.length > 5;
    },
    checkPassword: (state, action) => {
      state.isPasswordValid = action.payload.length > 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAuth.pending, (state) => {
        console.log("It's processing");
      })
      .addCase(asyncAuth.fulfilled, (state, action) => {
        console.log("Success");
        console.log(action);
      })
      .addCase(asyncAuth.rejected, (state, err) => {
        console.log("Failed");
      });
  },
});

export const { checkUserName, checkPassword, auth } = loginSlice.actions;
export const selectUserName = (state) => state.login.isUserNameValid;
export const selectPassword = (state) => state.login.isPasswordValid;

export default loginSlice.reducer;
