const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required!!!"], //If the user does not enter username , the error message will be displayed
    unique: true, //If the user enters a username already exists, the error message will be displayed
    caseSensitive: [false, "Keep your username in lowercase only"], //VIGnesh --> vignesh
    trim: [true, "Please make sure there are no extra spaces"], //If the user enters a username with spaces, error message will be displayed
    minLength: [3, "Chooese a longer username"],
    maxLength: [10, "Choose a shorter username"],
  },
  email: {
    type: String,
    required: [true, "Email is Required!!!"],
    unique: true,
    trim: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be atleast 8 characters long"],
    maxLength: [20, "Password should be atmost 20 characters long"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super admin"], //enum is used to restrict the vlues that can be entered in th database
    default: "user", //If the user does not enter a role, the default value will be user
  },
});


////////////////////////////////////////////////////////////////////////////

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    // salt is a string that is added to the password and mixed and a new string is generated that is not easily identified
    const salt = await bcrypt.genSalt(10); //10 is the number of rounds of hashing that will be done on the password
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (err) {
    console.log(err);
  }
});



userSchema.methods.comparePassword = async function (password) {
  const user = this;
  try{
    const result = await bcrypt.compare(password, this.password);
    return result;
  }
  catch(err){
    console.log(err);
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;
