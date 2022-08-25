import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  mobile: {
    type: String,
  },
  profile: {
    type: String,
  },
  otp: {
    type: Number,
  },
  birth: {
    type: String,
  },
  verified: {
    type: Number,
    default: 0,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);
export default User;