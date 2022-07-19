import multer from "multer";
import {
  unWatchedAds,
  userWatchedAds,
} from "../../controllers/admins/ads.controller.js";
import { withRequest } from "../../controllers/admins/request.model.js";
import { addBank } from "../../controllers/users/bank.controller.js";
import { changeCoin } from "../../controllers/users/exchangeCoin.controller.js";
import {
  buyCoin,
  getUserWallet,
} from "../../controllers/users/user-wallet.controller.js";
import {
  changePassword,
  createUser,
  getUser,
  getUserEdit,
  optVerification,
  sendOtp,
  signInUser,
  updateProfile,
} from "../../controllers/users/user.controller.js";
import { userMiddleware } from "../../middleware/user.middleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default (app) => {
  app.post("/users/signup", createUser);
  app.post("/users/signin", signInUser);
  app.get("/users/me", userMiddleware, getUser);
  app.put("/users/otp", userMiddleware, sendOtp);
  app.put("/users/verify/otp", userMiddleware, optVerification);
  app.patch("/users/edit", userMiddleware, getUserEdit);
  app.put(
    "/users/update",
    userMiddleware,
    upload.single("profile"),
    updateProfile,
  );
  app.put("/users/change/password", userMiddleware, changePassword);

  // banks routes
  app.post("/users/bank", userMiddleware, addBank);

  // user wallet routes
  app.get("/users/wallet", userMiddleware, getUserWallet);
  app.put("/users/buy/coins/:id", userMiddleware, buyCoin);
  app.post("/users/exchange/coins", userMiddleware, changeCoin);
  app.post("/users/request/payment", userMiddleware, withRequest);

  // show ads
  app.get("/users/ads", userMiddleware, unWatchedAds);
  app.put("/users/watch/ads/:id", userMiddleware, userWatchedAds);
};
