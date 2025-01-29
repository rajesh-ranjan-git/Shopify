// Import modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/router.js";

// Create server
const server = express();

// PORT
const PORT = process.env.PORT || 5000;

// * Middlewares

// CORS - Cross Origin Resource Sharing
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Cookie Parser
server.use(cookieParser());

// Body parsing
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Routes
server.use("/api", router);

// Server response
server.get("/", (req, res) => {
  return res.json({
    message: `Shoprixity server is running at http://localhost:${PORT}`,
  });
});

// Listen to server
server.listen(PORT, (error) => {
  if (error) {
    console.log({ error: "An error occurred while creating server!" });
    return;
  }
  console.log(`Shoprixity server is running at http://localhost:${PORT}`);
});
