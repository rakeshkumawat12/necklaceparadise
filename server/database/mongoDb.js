import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.mongo_db_url);

    if (connection) {
      console.log(`Connection to database ${connection.host}`);
    }
  } catch (e) {
    console.log("Error connecting to db");
  }
};

export default connectToDB;
