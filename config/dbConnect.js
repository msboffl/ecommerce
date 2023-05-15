import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected DB Succesfully..");
  } catch (error) {
    console.log("DB is not connected");
  }
};


