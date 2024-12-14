import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
};

export default connectDB;

