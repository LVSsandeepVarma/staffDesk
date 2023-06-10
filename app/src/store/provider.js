"use client";

// import { configureStore } from "@reduxjs/toolkit";
import {store} from "./store";
import { Provider } from "react-redux";

export function Providers({ children }) {
    // const store = configureStore()
  return <Provider store={store}>{children}</Provider>;
}