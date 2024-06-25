  import dotenv from "dotenv";
  dotenv.config();
  import mongoose from "mongoose";
  import express from "express";
  import bodyParser from "body-parser";
  import cookieParser from "cookie-parser";
  import cors from "cors";
  import authRouter from "./routes/auth.route.js";
  import http from "http";

  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173', // Update this with your frontend URL
    credentials: true,
  }));


  // Middleware and routes setup
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use('/api/auth', authRouter);


  // Error handling middleware
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


  const httpServer = http.createServer(app);


  const startServer = async () => {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB!");

      // Start the Node.js server
      const port = process.env.PORT || 5000;
      httpServer.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);

        // Start the Flask server after the Node.js server is running
      });
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  };

  // Start the server after establishing MongoDB connection
  startServer();
