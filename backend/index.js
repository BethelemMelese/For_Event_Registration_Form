const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const admin = require("./routes/admin.router.js");
const user = require("./routes/user.router.js");
const speaker = require("./routes/speakers.router.js");
const heroSection = require("./routes/heroSection.router.js");

// configuration file
dotenv.config();

var corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Define rate limit configuration
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minutes window
//   max: 5, // Allow 100 requests per window
//   message: `You have exceeded your 5 requests per minute limit.`,
//   headers: true,
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
// app.use(limiter);
app.use(cors(corsOptions));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, Express.js with MongoDB!");
});

// Connection with Mongodb Database and run the server
let PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.mongoDbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}...`);
    });
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

// CSRF Protection
// const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);

// routes
app.use("/api/admin", admin);
app.use("/api/users", user);
app.use("/api/speakers", speaker);
app.use("/api/heroSections", heroSection);
