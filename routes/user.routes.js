const express = require("express");
const User = require("../models/users.models");
const { generateToken, auth } = require("../middleware/auth");
const router = express.Router();

//Querying the database
router.get("/users",auth ,async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/users/:id", async (req, res) => {
  // res.send(`Single User with id: ${req.params.id}`);
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

//SignUp Route
router.post("/users/signup", async (req, res) => {
  const user = req.body;
  try {
    const addeduser = await User.create(user);

    //this payload is extracted while signing up the user
    //payload would be used to identify the api calls made by this user

    const payload = {
      email: user.email,
    };
    const token = await generateToken(payload);

    res.send(`Create User with id: ${addeduser}, token: ${token}`);
  } catch (err) {
    console.log(err);
  }
});

//Login Route
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    const token = await generateToken({ email: user.email });
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      res.status(400).send("Password is incorrect");
    } else {
      res.send("User is logged in");
    }
  } catch (err) {
    console.log(err);
  }
});

//Update the Documents
router.put("/users/:id", (req, res) => {
  res.send(`Update User with id: ${req.params.id}`);
});

//Delete Documents
router.delete("/users/:id", async (req, res) => {
  const deleteduser = await User.findByIdAndDelete(req.params.id);
  res.send(`Deleted the user with id: ${deleteduser}`);
});
module.exports = router;
