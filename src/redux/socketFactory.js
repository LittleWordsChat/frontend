import io from "socket.io-client";

class SocketConnection {
  constructor() {
    this.socket = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
  }
}

let socketConnection;

class SocketFactory {
  static create() {
    if (!socketConnection) {
      socketConnection = new SocketConnection();
    }
    return socketConnection;
  }
}

export default SocketFactory;
