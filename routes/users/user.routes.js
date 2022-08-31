import multer from "multer";
import passport from "passport";
import "../../controllers/users/passport-setup.js";
import "../../controllers/users/facebook-login.js";
import {
  unWatchedAds,
  userWatchedAds,
} from "../../controllers/admins/ads.controller.js";
import { withRequest } from "../../controllers/admins/request.controller.js";
import {
  cancelPlan,
  deletePackagePlan,
  getBanner,
  getCancelPlan,
  getCoin,
  getGoogleAds,
  getPackageplan,
  getSubscribePlan,
  getVideoAds,
  removeAdsCounter,
  slideOrderVariable,
  subscribePlan,
} from "../../controllers/users/ads.controller.js";
import {
  addBank,
  userDeleteBanks,
  userEditBanks,
  userGetBanks,
  userUpdateBanks,
} from "../../controllers/users/bank.controller.js";
import {
  changeCoin,
  deleteCoin,
} from "../../controllers/users/exchangeCoin.controller.js";
import {
  getTransaction,
  todayTransection,
  yesterdayTransection,
} from "../../controllers/users/transaction.controller.js";
import {
  buyCoin,
  getUserWallet,
} from "../../controllers/users/user-wallet.controller.js";
import {
  changePassword,
  createUser,
  forgetPassword,
  getUser,
  getUserEdit,
  optVerification,
  sendOtp,
  signInUser,
  updateProfile,
} from "../../controllers/users/user.controller.js";
import { userMiddleware } from "../../middleware/user.middleware.js";
import {
  emptyTodayEarn,
  getReport,
} from "../../controllers/users/report.controller.js";

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
  app.put("/users/forget/password", forgetPassword);

  // banks routes
  app.post("/users/bank", userMiddleware, addBank);
  app.get("/users/bank", userMiddleware, userGetBanks);
  app.patch("/users/bank/:id", userMiddleware, userEditBanks);
  app.put("/users/bank", userMiddleware, userUpdateBanks);
  app.delete("/users/bank/:id", userMiddleware, userDeleteBanks);

  // user wallet routes
  app.get("/users/wallet", userMiddleware, getUserWallet);
  app.put("/users/buy/coins/:id", userMiddleware, buyCoin);
  app.post("/users/exchange/coins", userMiddleware, changeCoin);
  app.post("/users/request/payment", userMiddleware, withRequest);

  // show ads
  app.get("/users/ads", userMiddleware, unWatchedAds);
  app.get("/users/package", userMiddleware, getPackageplan);
  app.get("/users/banner", userMiddleware, getBanner);
  app.put("/users/watch/ads/:id", userMiddleware, userWatchedAds);
  app.get("/users/coin", userMiddleware, getCoin);
  app.get("/users/transactions", userMiddleware, getTransaction);
  app.put("/subscribe/plan/:id", userMiddleware, subscribePlan);
  app.put("/cancel/plan/:id", userMiddleware, cancelPlan);
  app.get("/get/subscribe/plan", userMiddleware, getSubscribePlan);
  app.get("/get/cancel/plan", userMiddleware, getCancelPlan);
  app.get("/users/videos/ads", userMiddleware, getVideoAds);
  app.get("/users/reports", userMiddleware, getReport);
  app.get("/users/google/ads", userMiddleware, getGoogleAds);
  app.put("/users/coin/empty", userMiddleware, emptyTodayEarn);
  app.delete("/users/delete/coin", userMiddleware, deleteCoin);
  app.put("/users/empty/ads", userMiddleware, removeAdsCounter);
  app.delete("/users/delete/plan", userMiddleware, deletePackagePlan);
  app.get("/users/order/var", userMiddleware, slideOrderVariable);
  app.get(
    "/users/transactions/yesterday",
    userMiddleware,
    yesterdayTransection,
  );
  app.get("/users/transactions/today", userMiddleware, todayTransection);

  // setTimeout(() => {
  //   app.put("/users/empty/ads", userMiddleware, removeAdsCounter);
  // }, 5000);

  // change plan
  // app.put('/users/change/plan',userMiddleware)

  // google login
  // Auth Routes

  // Initializes passport and passport sessions
  app.use(passport.initialize());
  app.use(passport.session());

  // Example protected and unprotected routes
  app.get("/failed", (req, res) => res.send("You Failed to log in!"));

  const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
  // In this route you can see that if the user is logged in u can access his info in: req.user
  app.get("/authenticate", isLoggedIn, (req, res) => {
    return res.send({
      success: true,
      users: req.user,
    });
  });
  app.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/authenticate");
    },
  );

  app.get("/logout", (req, res) => {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    return done(null, user);
  });

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: "email,user_photos" }),
  );

  app.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/failed",
    }),
    function (req, res) {
      res.redirect("/profile");
    },
  );

  app.get("/profile", (req, res) => {
    return res.send({
      success: true,
      user: req.user,
    });
  });
};
