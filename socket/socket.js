import { sendChatService } from "../services/chat.service.js";

export const registerSocketHandler = (io) => {
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-online", (userId) => {
      onlineUsers.set(userId, socket.id);

      console.log("Online Users:", onlineUsers);
    });

    socket.on("send-message", async (data) => {
      try {
        const { senderId, receiverId, message } = data;
        if (!senderId || !receiverId || !message) {
          return;
        }

        const chat = await sendChatService({
          senderId,
          receiverId,
          message,
        });

        const receiverSocketId = onlineUsers.get(receiverId);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive-message", chat);
        }

        socket.emit("message-sent", chat);
      } catch (error) {
        console.log("Socket Error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};
