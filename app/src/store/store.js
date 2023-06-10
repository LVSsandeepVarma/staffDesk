import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer  from "./slice/userInfoSlice";
import loaderReducer from "./slice/loaderSlice";
import passwordHashReducer from "./slice/passwordHashSlice";
export const store = configureStore({
    reducer: {
      userInfoReducer,
      loaderReducer,
      passwordHashReducer
    },
  });

// export const wrapper = createWrapper(Store);