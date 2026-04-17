import jwt from "jsonwebtoken";

export const initSocket = (io) => {
  // 🔐 socket middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("no token provided"));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      socket.user = decoded;
      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  // connection block
  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    // join room
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("joined room:", userId);
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};