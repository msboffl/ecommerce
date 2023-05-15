import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

// Create User
export const createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body;
  const findUser = await User.findOne(email);

  if (!findUser) {
    // Create new User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exist
    throw new Error("User Already exists");
  }
});

// Login User
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Get All Users
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single User
export const getSingleUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleUser = await User.findById(id);
    res.json(getSingleUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Single User
export const deleteSingleUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteSingleUser = await User.findByIdAndDelete(id);
    res.json(deleteSingleUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Update a Single User
export const updateSingleUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateSingleUser = await User.findByIdAndUpdate(id, {
      firstName: req?.body?.firstName,
      lastName: req.body?.lastName,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    });
    res.json(updateSingleUser);
  } catch (error) {
    throw new Error(error);
  }
});
