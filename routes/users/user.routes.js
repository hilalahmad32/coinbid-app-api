import { addBank } from "../../controllers/users/bank.controller.js";
import {
  createUser,
  getUser,
  getUserEdit,
  optVerification,
  sendOtp,
  signInUser,
  updateProfile,
} from "../../controllers/users/user.controller.js";
import { userMiddleware } from "../../middleware/user.middleware.js";

export default (app) => {
  app.post("/users/signup", createUser);
  app.post("/users/signin", signInUser);
  app.get("/users/me", userMiddleware, getUser);
  app.put("/users/otp", userMiddleware, sendOtp);
  app.put("/users/verify/otp", userMiddleware, optVerification);
  app.patch("/users/edit", userMiddleware, getUserEdit);
  app.put("/users/update", userMiddleware, updateProfile);

  // banks routes
  app.post("/users/bank", userMiddleware, addBank);
};
