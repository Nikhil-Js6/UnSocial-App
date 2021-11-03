require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const conversationsRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");

const app = express();

mongoose.connect(process.env.LCL_DB_URL, { useUnifiedTopology: true }, () => {
     console.log("Connected to the Database");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Routes

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);

let PORT = process.env.PORT || 3300;

app.listen(PORT, function(req, res){
     console.log(`Server running on Port: ${PORT}`);
});
