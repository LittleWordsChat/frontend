import {
  socketConnected,
  setOnlineUser,
  setAllUser,
  setAllMessage,
  setDataUser,
  setupSocketListeners,
  socketDisconnected,
} from "./chatSlice";
import SocketFactory from "./socketFactory";

const socketMiddleware = (store) => {
  let socketFactory;
  let socket;
  return (next) => (action) => {
    switch (action.type) {
      case "chat/socketConnect":
        socketFactory = SocketFactory.create();
        socket = socketFactory.socket;
        store.dispatch(socketConnected());
        store.dispatch(setupSocketListeners());
        break;

      case "chat/setupSocketListeners":
        if (socket) {
          socket.on("onlineUsers", (data) => {
            store.dispatch(setOnlineUser(data));
          });
          socket.on("message-user", (data) => {
            store.dispatch(setDataUser(data));
          });

          socket.on("message", (data) => {
            store.dispatch(setAllMessage(data));
          });
          socket.on("conversation", (data) => {
            const conversationUserData = data.map((conversationUser, index) => {
              if (
                conversationUser?.sender?._id ===
                conversationUser?.receiver?._id
              ) {
                return {
                  ...conversationUser,
                  userDetails: conversationUser?.sender,
                };
              } else if (conversationUser?.receiver?._id !== store.getState().user._id) {
                return {
                  ...conversationUser,
                  userDetails: conversationUser.receiver,
                };
              } else {
                return {
                  ...conversationUser,
                  userDetails: conversationUser.sender,
                };
              }
            });
            store.dispatch(setAllUser(conversationUserData));
          });
        }
        break;
      case "chat/socketDisconnect":
        if (socket) {
          socket.disconnect();
          store.dispatch(socketDisconnected());
        }
        break;
      case "chat/emitSidebar":
        if (socket) {
          socket.emit("sidebar", action.payload);
        }
        break;
      case "chat/emitMessagePage":
        if (socket) {
          socket.emit("message-page", action.payload);
        }
        break;
      case "chat/emitSeen":
        if (socket) {
          socket.emit("seen", action.payload);
        }
        break;
      case "chat/emitNewMessage":
        if (socket) {
          socket.emit("new-message", action.payload);
        }
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default socketMiddleware;
