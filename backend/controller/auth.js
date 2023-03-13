import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userAlready = await User.findOne({ email });

  if (userAlready) {
    return res.status(409).json("User already exists!");
  }
  const bcryptSalt = bcrypt.genSaltSync(10);

  await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  return res.status(200).json("User has been created");
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userFind = await User.findOne({ email });

  if (!userFind) {
    return res.status(404).json("User not found!");
  }
  const isPasswordCorrect = bcrypt.compareSync(password, userFind.password);

  if (!isPasswordCorrect) {
    return res.status(400).json("Wrong username or password");
  }

  const token = jwt.sign(
    { email: userFind.email, id: userFind._id, name: userFind.name },
    "jwtSecret"
  );

  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(userFind);
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

export const profile = (req, res) => {
  const { access_token } = req.cookies;
  if (access_token) {
    jwt.verify(access_token, "jwtSecret", {}, async (err, data) => {
      if (err) return res.status(403).json("Token is not valid");
      const { name, email, _id } = await User.findById(data.id);
      res.json({ name, email, _id });
    });
  } else {
    res.status(401).json("Not authenticated");
  }
};
