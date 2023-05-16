import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Autherized token expired, please login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const isAdminUser = await User.findOne(email);
  if (isAdminUser.role !== "admin") {
    throw new Error("You Are Not Admin");
  } else {
    next();
  }
});
