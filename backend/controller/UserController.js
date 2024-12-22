const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "User Already Exists",
        error: true,
      });
    }

    //Encrypt password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const data = {
      name,
      email,
      password: hashPassword,
      profile_pic,
    };
    const user = new UserModel(data);
    const SaveUser = await user.save();

    return res.status(201).json({
      message: "USer Created Succesfully",
      data: SaveUser,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
}
module.exports = registerUser;
