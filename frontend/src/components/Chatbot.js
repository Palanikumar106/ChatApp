import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import DOMPurify from "dompurify"; // To sanitize HTML
import FormatText from "./formatText"; // Import MessageFormatter component
import userImage from "../images/logo.png";
import { useSelector } from "react-redux";
import chatbotAvatar from "../images/chatbot.png";
import tick from "../images/tick.png";
import { useParams, Link } from "react-router-dom";
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();
  const user = useSelector((state) => state?.user);

  const [userInput, setUserInput] = useState("");
  const chatbotName = "Chatbot";
  console.log("vv ", userId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/chatbot-Message",
          {
            params: { id: userId },
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Rended Message", response.data.message);
        setMessages(response.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [userId]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to the chat
    const Message = userInput;
    const newMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");

    try {
      // Send user input to the backend
      const response = await axios.get(
        `http://localhost:8080/api/chatbot/676144dbbbcb946700b3f183`,
        {
          params: { prompt: Message, id: user._id },
          headers: { "Content-Type": "application/json" },
        }
      );

      // Clean up and sanitize the response text for HTML display
      let responseText = response.data.message;

      // You can add extra text processing or sanitization here as needed
      responseText = DOMPurify.sanitize(responseText); // Sanitize to avoid XSS

      // Add bot message to the chat
      const botMessage = { sender: "bot", text: responseText };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "Oops! Something went wrong. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <header
        style={{
          height: "64px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={20} style={{ cursor: "pointer" }} />
          </Link>

          <Avatar width={40} height={40} imageUrl={chatbotAvatar} name={"AI"} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>{"BUDDY"}</h3>
            <img
              src={tick}
              alt="Verified"
              style={{ width: "40px", height: "30px" }}
            />
          </div>
        </div>
        <HiDotsVertical style={{ cursor: "pointer" }} />
      </header>
      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ddd",
          marginBottom: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages &&
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {msg.sender === "bot" && (
                  <img
                    src={chatbotAvatar}
                    alt="Bot Avatar"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                )}
                {msg.sender === "user" && (
                  <img
                    src={user.profile_pic}
                    alt="User Avatar"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                )}
                <div>
                  {/* Use MessageFormatter to render the message */}
                  <FormatText message={msg.text} />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Input Field */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginRight: "5px",
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
