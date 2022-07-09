import mongoose from "mongoose";

const connection = async () => {
  mongoose.connect(
    process.env.MONGODB_URL,
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
