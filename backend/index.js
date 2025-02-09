const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = 5000; // You can choose any port number you prefer.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

// const allowedOrigins = ["https://datawizdipsy.netlify.app/"];
const allowedOrigins = ["http://localhost:3000"];

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

const dbUrl =
  "mongodb+srv://melesebety2673:Admin@123@event-registration-form.z5ikc.mongodb.net/?retryWrites=true&w=majority&appName=Event-Registration-Form"; // Replace 'my_database' with your preferred database name.

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

app.get("/", (req, res) => {
  res.send("Hello, Express.js with MongoDB!");
});
