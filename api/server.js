/** @format */

const express = require("express");
const app = express();
const AuthRoutes = require("./routes/AuthRoutes");
const Todos = require("./routes/Todo");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middleware

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/Auth", AuthRoutes);
app.use("/Todos", Todos);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
