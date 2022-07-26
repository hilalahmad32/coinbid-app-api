import mongoose from "mongoose";

const connection = async () => {
  mongoose.connect(
    // "mongodb://localhost:27017/coinbid",
    "mongodb+srv://hilalahmad:twhbVOlEuCObupdY@cluster0.f8tgo.mongodb.net/coinbid",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .then(() => {
      console.log("connection Successfully established");
    })
    .catch((err) => console.log(err.message));
};
export default connection;
