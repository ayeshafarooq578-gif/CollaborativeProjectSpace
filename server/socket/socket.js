import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

  io = new Server(server, {
    cors: {
      origin: clientUrl,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => io;
