import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongo DB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "prompttopia",
    });
    isConnected = true;
    console.log("Mongo DB connected!!");
  } catch (err) {
    console.log(err);
  }
};
