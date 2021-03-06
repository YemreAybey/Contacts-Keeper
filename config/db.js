import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI");

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

export default connectDb;
