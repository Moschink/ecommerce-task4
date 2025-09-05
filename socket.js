let io;

function initSocket(server) {
  io = require("socket.io")(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    socket.on("join", ({ userId }) => {
      socket.join(userId);
      console.log(`customer ${userId} joined their private room`);
    });

    socket.on("disconnect", () => {
      console.log("disconnected:", socket.id);
    });
  });

  return io;
}

// function to emit notifications from controllers
function notifyUser(userId, payload) {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  io.to(userId).emit("notification", payload);
  console.log("Notification sent to user:", userId, payload);
}

module.exports = { initSocket, notifyUser };
