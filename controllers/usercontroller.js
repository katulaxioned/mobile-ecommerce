const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../modals/user");
require("dotenv").config();

const postSignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "please enter email and password"});
    }

    const hashedPassword = bcrypt.hashSync(password.toString(), 10);

    const oldUser = await user.find({email: email});
    if (oldUser.length > 0) {
      return res.status(409).json({ msg: "can't sign in. user already exist."})
    }


    const createdUser = await user.create({
      email: email,
      password: hashedPassword
    })

    return res.status(200).json({ success: true, msg: "User created please log in" });
  } catch (err) {
    next(err);
  }
}

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "please enter email and password"});
    }

    const result = await user.find({email: email});
    if (result.length === 0) {
      return res.status(401).json({ msg: "can't log in. please sign up."});
    }
    // console.log(result)
    if (!bcrypt.compareSync(password.toString(), result[0].password)) {
      return res.status(401).json({ msg: "wrong password" })
    }

    const token = jsonWebToken.sign({ id: result[0]._id, email: email }, process.env.SECRET_JWT_CODE);
    return res.status(200).json({ success: true, token: token, msg: "loged in" });
  } catch (err) {
    next(err);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const result = await user.find()
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postSignUp,
  logIn,
  getAllUsers
}