import jwt from "jsonwebtoken";

// Auth middleware
const authMiddleware = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    // Decoding token to get user
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

export default authMiddleware;
