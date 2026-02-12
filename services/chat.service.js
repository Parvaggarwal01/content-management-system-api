import Chat from "../models/chat.js";
import Thread from "../models/thread.js";

export const getChatsBYThreadService = async (threadId) => {
  return await Chat.find({ thread: threadId })
    .populate("sender", "name email")
    .sort({ createdAt: 1 });
};

export const sendChatService = async ({ senderId, receiverId, message }) => {
  const thread = await findOrCreateThreadService(senderId, receiverId);

  const newChat = await Chat.create({
    thread: thread._id,
    sender: senderId,
    message,
  });

  await Thread.findByIdAndUpdate(thread._id, {
    lastMessage: message,
    // lastMessageAt: new Date()
  });

  return await newChat.populate("sender", "name email");
};

export const getUserThreadsService = async (userId) => {
  const threads = await Thread.find({
    participants: userId,
  })
    .populate("participants", "name email")
    .sort({ updatedAt: -1 });

  return threads;
};

export const findOrCreateThreadService = async (userId1, userId2) => {
  const participants = [userId1, userId2].sort();

  let threads = await Thread.findOne({
    participants: { $all: participants },
    $expr: { $eq: [{ $size: "$participants" }, 2] },
  });

  if (!threads) {
    threads = await Thread.create({
      participants,
    });
  }

  return threads;
};
