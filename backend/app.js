const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");

const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const recipeRouter = require("./routes/recipeRoutes");
const commentRouter = require("./routes/commentRoutes");
const AppError = require("./utils/AppError");
const GlobalErrorHandler = require("./controllers/errorController");

const app = express();

const allowedOrigin = 'http://localhost:5173';  // Frontend URL

// CORS configuration
const corsOptions = {
  origin: allowedOrigin,  // Only allow requests from this origin
  methods: 'GET,POST,PUT,DELETE,PATCH',  // Allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
  credentials: true,  // If your frontend uses cookies or authorization headers
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));


app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use(express.json());

app.use(mongoSanitize());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/comments", commentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
