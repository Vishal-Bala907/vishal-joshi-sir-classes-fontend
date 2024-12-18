// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the shape of the user object
// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   role: string;
//   image_url: string;
//   tests?: any[]; // Optionally store related tests
//   mentors?: any[]; // Optionally store related mentors
// }

// const initialState: User = {
//   _id: "",
//   username: "",
//   email: "",
//   role: "",
//   image_url: "",
//   tests: [], // To store tests if needed
//   mentors: [], // To store mentors if needed
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<User>) => {
//       return action.payload;
//     },
//   },
// });

// export const { setUser } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
