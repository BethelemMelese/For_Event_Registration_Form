const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = 5000; // You can choose any port number you prefer.

const admin = require("./routes/admin.router.js");
const user = require("./routes/user.router.js");
const speaker = require("./routes/speakers.router.js");
const heroSection = require("./routes/heroSection.router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// configuration file
dotenv.config();

const allowedOrigins = ["https://grandhabshabusinessevent.netlify.app/"];
// const allowedOrigins = ["http://localhost:3000"];

var corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(
  cors({
    origin: "*", // Replace with your domain or use '*' to allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the headers you want to allow
    credentials: true, // If you need to allow cookies or other credentials
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors(corsOptions)); // Handle preflight requests

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization,Origin, X-Requested-With"
  );
  next();
});

// Middleware to serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, Express.js with MongoDB!");
});

// Connection with Mongodb Database and run the server
let PORT = process.env.PORT || 5000;
mongoose
  .connect(
    "mongodb+srv://melesebety2673:Admin@businessevent.caewh.mongodb.net/?retryWrites=true&w=majority&appName=BusinessEvent"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}...`);
    });
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

// routes
app.use("/api/admin", admin);
app.use("/api/users", user);
app.use("/api/speakers", speaker);
app.use("/api/heroSections", heroSection);
