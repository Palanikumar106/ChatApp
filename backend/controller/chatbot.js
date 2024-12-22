const MessageModel = require("../models/Message");
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function chatbot(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyDoo1yJF5LMYqeQsOkhgC_EzKMqovHbQ6E"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.query.prompt;
    const result = await model.generateContent(prompt);

    console.log(result.response.text());
    let responseText = result?.response?.text();

    // Text formatting
    responseText = responseText.replace(/```(.*?)```/gs, ""); // Remove code blocks
    responseText = responseText.replace(
      /(?:\*\*|__)(.*?)(?:\*\*|__)/g,
      "<strong>$1</strong>"
    ); // Bold text
    responseText = responseText.replace(
      /(?:\*|_)(.*?)(?:\*|_)/g,
      "<em>$1</em>"
    ); // Italic text

    const userId = req.query.id;

    // Fetch or initialize the chat
    let chat = await MessageModel.findOne({ UserId: userId });
    if (!chat) {
      chat = new MessageModel({ UserId: userId, messages: [] });
    }

    // Add user and bot messages
    chat.messages.push({ sender: "user", text: prompt });
    chat.messages.push({
      sender: "bot",
      text: responseText || "No response from AI.",
    });

    // Save to database
    await chat.save();

    console.log(
      "Message Stored",
      await MessageModel.findOne({ UserId: userId })
    );

    return res.status(200).json({
      message: responseText || "No response from AI.",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      success: false,
    });
  }
}

module.exports = chatbot;
