const { Router } = require("express");
const authRouter = Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../Model/User.model");

//signup user

authRouter.post("/signup", async (req, res) => {
  let { name, email, password, age, contact } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      // Store hash in your password DB.
      const user = new UserModel({
        name,
        email,
        password: hash,
        age,
        contact,
      });

      try {
        await user.save();
        res.status(200).send({ msg: "Signup was Successfull" });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send(
            "Some Error occurred while registering a user. Please try again."
          );
      }
    });
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.send("Signup needed for logging in.");
  } else {
    const hash_pass = user.password;

    bcrypt.compare(password, hash_pass, function (err, result) {
      if (result) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.status(200).send({ msg: "Login Successful", token: token });
      } else {
        res.status(500).send("Invalid Credentials. Please try again.");
      }
    });
  }
});

module.exports = { authRouter };
