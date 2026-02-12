import {
  getChatsBYThreadService,
  sendChatService,
  getUserThreadsService,
} from "../services/chat.service.js";

export const getChatsByThread = async (req, res) => {
  try {
    const { threadId } = req.params;

    const chats = await getChatsBYThreadService(threadId);

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserThreads = async (req, res) => {
  try {
    const threads = await getUserThreadsService(req.user.id);
    res.status(200).json({
      success: true,
      threads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendChat = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    const chat = await sendChatService({
      senderId: req.user.id,
      receiverId,
      message,
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
