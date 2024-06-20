import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import socketMiddleware from "./socketMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["chat/socketConnect", "chat/socketDisconnect"],
        ignoredPahts: ["chat.socketConnection"],
      },
    }).concat([socketMiddleware]),
});
