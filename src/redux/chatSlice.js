import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketConnection: null,
  allMessage: [],
  onlineUser: [],
  allUser: [],
  connected: false,
  dataUser: { name: "", email: "", profile_pic: "", online: false, _id: "" },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    socketConnect: (state, action) => {},
    socketDisconnect: (state, action) => {},
    socketMessageReceived: (state, action) => {
      state.messages.push(action.payload);
    },

    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },

    socketConnected: (state) => {
      state.connected = true;
    },
    socketDisconnected: (state, action) => {
      state.connected = false;
    },
    setAllMessage: (state, action) => {
      state.allMessage = action.payload;
    },
    setupSocketListeners: (state, action) => {},
    emitSeen: (state, action) => {},
    emitSidebar: (state, action) => {},
    emitMessagePage: (state, action) => {},
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
    setDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    emitNewMessage: (state, action) => {},
  },
});

export const {
  socketConnect,
  socketDisconnect,
  socketMessageReceived,
  setOnlineUser,
  socketConnected,
  socketDisconnected,
  setAllMessage,
  setupSocketListeners,
  emitSeen,
  emitMessagePage,
  setAllUser,
  setDataUser,
  emitSidebar,
  emitNewMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
