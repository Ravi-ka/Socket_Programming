import mongoose from "mongoose";

const url =
  "mongodb+srv://ka_ravisankar:Qwaszxopklnm06@cluster0.akmryci.mongodb.net/ChatBot?retryWrites=true&w=majority";

export const connectToMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongoDB cloud server");
  } catch (error) {
    console.log("Error while connecting to Mongoose : " + error);
  }
};
