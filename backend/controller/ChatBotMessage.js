const MessageModel = require("../models/Message");
async function ChatBotMessage(req, res) {
  try {
    const userId = req.query.id;
    console.log(req.query);

    const chat = await MessageModel.findOne({ UserId: userId });
    console.log(chat);

    res.status(201).json({
      message: chat?.messages || [],
      success: true,
    });
  } catch {
    res.status(201).json({
      message: [],
      success: true,
    });
  }
}

module.exports = ChatBotMessage;
