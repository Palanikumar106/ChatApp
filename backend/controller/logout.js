async function logout(req, res) {
  try {
    const cookieOption = {
      http: true, // Prevent client-side JavaScript from accessing the cookie
      secure: true, // Only secure in production
      sameSite: "None", // Allow cross-origin cookie sharing
    };

    return res.cookie("token", "", cookieOption).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
}
module.exports = logout;
