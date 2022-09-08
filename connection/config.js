import mongoose from "mongoose";

const connection = async () => {
  mongoose.connect(
      "mongodb+srv://Coinbid:58C3dmlIetAbujIr@cluster0.nyrglnd.mongodb.net/Coinbid",
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

