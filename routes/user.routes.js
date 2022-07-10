import { createUser } from "../controllers/user.controller.js";
import { signupValidation } from "../validation/validation.js";

export default (app) => {
  app.post("/users/signup", createUser);
};
