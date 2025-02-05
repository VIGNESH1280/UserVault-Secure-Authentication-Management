const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const logger = require("./middleware/logger.middleware.js");
const clouddburl =
  "mongodb+srv://vigneshc93663:qwertyhello123@cluster0.iizux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



const User = require("./models/users.models.js");
const userRoutes = require("./routes/user.routes.js");
const cors = require("cors");



mongoose
  .connect(clouddburl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(logger);
app.use("/", userRoutes);




const corsOptions = {
  origin: "*",
  methods: "GET, POST", //Only can do login and signup can't update the data
  // allowedHeaders: "Content-type",
  // optionsSuccessStatus: 200
  credentials: true,
};
app.use(cors(corsOptions));





app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the User Management API</h1> <br/> <p>We have built this API for User Management through node and express</p>"
  );
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
