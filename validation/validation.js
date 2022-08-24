import { check } from "express-validator";

export const signupValidation = () => {
  check("name", "The name field is required").not().isEmpty();
  check("email", "The email field is required").not().isEmpty();
  check("password", "The password field is required").not().isEmpty();
};
