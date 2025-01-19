// Logout user

const logout = async () => {
  // Remove cookie
  res.clearCookie(
    "token".json({ success: true, message: "Logged out successfully!" })
  );
};

export default logout;
