// Logout user

const logout = async (req, res) => {
  // Remove cookie
  return res
    .clearCookie("token")
    .status(200)
    .json({ status: 200, success: true, message: "Logged out successfully!" });
};

export default logout;
