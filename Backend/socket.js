import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

// Sockets carry only a lightweight "something changed" signal, never the
// submitted content itself — the client re-fetches via the existing
// authenticated REST endpoints, which already enforce role-based access.
export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: process.env.FRONTEND_URL },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));

    try {
      socket.admin = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    socket.join("admins");
  });

  return io;
};

export const emitNewLead = (resource, id) => {
  if (!io) return;
  io.to("admins").emit("new-lead", { resource, id });
};
