const express = require("express");
const registerUser = require("../controller/UserController");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const searchUser = require("../controller/SearchUser");
const chatbot = require("../controller/chatbot");
const ChatBotMessage = require("../controller/ChatBotMessage");

const router = express.Router();

router.post("/register", registerUser);

router.post("/email", checkEmail);

router.post("/password", checkPassword);

router.get("/user-details", userDetails);

router.get("/logout", logout);

router.post("/update-user", updateUserDetails);

router.post("/search-user", searchUser);

router.get("/chatbot/:userId", chatbot);

router.get("/chatbot-Message", ChatBotMessage);

module.exports = router;
