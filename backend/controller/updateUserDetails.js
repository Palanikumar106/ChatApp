const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(req, res) {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDetailsFromToken(token);

    const { name, profile_pic } = req.body;
    console.log("Request :", req.body);

    await UserModel.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );

    const userInfo = await UserModel.findById(user._id);

    return res.json({
      message: "User Updated Succefully",
      data: userInfo,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
}
module.exports = updateUserDetails;
