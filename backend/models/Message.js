const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
    ref: "User",
    unique: true,
  },
  messages: [
    {
      sender: {
        type: String,
        required: true,
        enum: ["user", "bot"],
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const MessageModel = new mongoose.model("ChatBotMessage", MessageSchema);

module.exports = MessageModel;
