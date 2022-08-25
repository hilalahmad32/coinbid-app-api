import multer from "multer";
import {
  admin,
  adminLogin,
} from "../../controllers/admins/admin.controller.js";
import {
  getBanks,
  getDashboardBanks,
  paid,
  unpaid,
} from "../../controllers/admins/bank.controller.js";
import {
  addAds,
  deleteAds,
  editAds,
  getAds,
  updateAds,
} from "../../controllers/admins/ads.controller.js";
import {
  addBounesCoin,
  deleteBounesCoin,
  editBounesCoin,
  getBounesCoin,
  updateBounesCoin,
} from "../../controllers/admins/bonus.controller.js";
import {
  addCoin,
  deleteCoin,
  editCoin,
  getCoin,
  getUsers,
  updateCoin,
} from "../../controllers/admins/coin.controller.js";
import {
  createPackagePlan,
  deletePackageplan,
  editPackageplan,
  getPackageplan,
  updatePackagePlan,
} from "../../controllers/admins/packageplan.controller.js";
import {
  getPriceCoin,
  updatePriceCoins,
} from "../../controllers/admins/pricecoin.controller.js";
import {
  deleteUser,
  editUser,
  getUser,
  totalUser,
  updateUser,
} from "../../controllers/admins/user.controller.js";
import { adminMiddleware } from "../../middleware/admin.middleware.js";
import {
  addBanner,
  deleteBanner,
  editBanner,
  getBanner,
  updateBanner,
} from "../../controllers/admins/banner.controller.js";
import {
  ApproveRequest,
  getRequest,
  getTransaction,
  rejectedRequest,
} from "../../controllers/admins/request.controller.js";

import {
  getNotifications,
} from "../../controllers/admins/notification.controller.js";
import { verify } from "../../controllers/admins/csvVerification.controller.js";
import {
  addVideoAds,
  deleteVideoAds,
  editVideoAds,
  getVideoAds,
  updateVideoAds,
} from "../../controllers/admins/video-ads.controller.js";
import {
  createGoogleAds,
  deleteGoogleAds,
  editGoogleAds,
  getGoogleAds,
  updateGoogleAds,
} from "../../controllers/admins/google-ads.controller.js";
import {
  addTax,
  editTax,
  getTax,
  updateTax,
} from "../../controllers/admins/tax.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + "-" + file.fieldname + "." + extension);
  },
});

const upload = multer({ storage: storage });
export default (app) => {
  app.post("/admin/login", adminLogin);
  app.get("/admin", adminMiddleware, admin);
  app.get("/admin/users", adminMiddleware, getUser);
  app.get("/admin/total/users", adminMiddleware, totalUser);
  app.patch("/admin/edit/users/:id", adminMiddleware, editUser);
  app.put("/admin/update/users/:id", adminMiddleware, updateUser);
  app.delete("/admin/delete/users/:id", adminMiddleware, deleteUser);
  app.get("/admin/banks", adminMiddleware, getBanks);
  app.get("/admin/banks/unpaid", adminMiddleware, unpaid);
  app.get("/admin/banks/paid", adminMiddleware, paid);
  app.get("/admin/dashboard/banks", adminMiddleware, getDashboardBanks);

  // ads routes
  app.post(
    "/admin/ads",
    adminMiddleware,
    upload.array("images", 10),
    addAds,
  );
  app.get("/admin/ads", adminMiddleware, getAds);
  app.delete("/admin/ads/:id", adminMiddleware, deleteAds);
  app.patch("/admin/ads/:id", adminMiddleware, editAds);
  app.put(
    "/admin/ads/:id",
    adminMiddleware,
    upload.array("images", 10),
    updateAds,
  );

  // coin routes
  app.get("/admin/coin", adminMiddleware, getCoin);
  app.post("/admin/coin", adminMiddleware, addCoin);
  app.get("/admin/user/get", adminMiddleware, getUsers);
  app.patch("/admin/coin/:id", adminMiddleware, editCoin);
  app.put("/admin/coin/:id", adminMiddleware, updateCoin);
  app.delete("/admin/coin/:id", adminMiddleware, deleteCoin);

  // bounes
  app.get("/admin/bounes/coin", adminMiddleware, getBounesCoin);
  app.post("/admin/bounes/coin", adminMiddleware, addBounesCoin);
  app.patch("/admin/bounes/coin/:id", adminMiddleware, editBounesCoin);
  app.put("/admin/bounes/coin/:id", adminMiddleware, updateBounesCoin);
  app.delete("/admin/bounes/coin/:id", adminMiddleware, deleteBounesCoin);

  // package plan routes
  app.get(
    "/admin/package/plan",
    adminMiddleware,
    getPackageplan,
  );
  app.post(
    "/admin/package/plan",
    adminMiddleware,
    // upload.single("icon"),
    createPackagePlan,
  );
  app.patch("/admin/package/plan/:id", adminMiddleware, editPackageplan);
  app.put(
    "/admin/package/plan/:id",
    upload.single("icon"),
    adminMiddleware,
    updatePackagePlan,
  );
  app.delete(
    "/admin/package/plan/:id",
    adminMiddleware,
    deletePackageplan,
  );

  // price coins plan routes
  app.get("/admin/price/coin", adminMiddleware, getPriceCoin);
  app.put("/admin/price/coin/:id", adminMiddleware, updatePriceCoins);

  app.post(
    "/admin/banner",
    adminMiddleware,
    // upload.single("image"),
    addBanner,
  );
  app.get("/admin/banner", adminMiddleware, getBanner);
  app.delete("/admin/banner/:id", adminMiddleware, deleteBanner);
  app.patch("/admin/banner/:id", adminMiddleware, editBanner);
  app.put(
    "/admin/banner/:id",
    adminMiddleware,
    // upload.single("image"),
    updateBanner,
  );

  // user with draw
  app.get("/admin/withdraws/request", adminMiddleware, getRequest);
  app.put("/admin/bank/approve/:id", adminMiddleware, ApproveRequest);
  app.put("/admin/bank/rejected/:id", adminMiddleware, rejectedRequest);
  app.get("/admin/notification", adminMiddleware, getNotifications);
  app.post("/admin/verify", adminMiddleware, upload.single("file"), verify);

  // video ads
  app.post(
    "/admin/video/ads",
    adminMiddleware,
    // upload.single("video"),
    addVideoAds,
  );
  app.get("/admin/video/ads", adminMiddleware, getVideoAds);
  app.patch("/admin/video/ads/:id", adminMiddleware, editVideoAds);
  app.delete("/admin/video/ads/:id", adminMiddleware, deleteVideoAds);
  app.put(
    "/admin/video/ads/:id",
    adminMiddleware,
    upload.single("video"),
    updateVideoAds,
  );

  app.get("/admins/transactions", adminMiddleware, getTransaction);

  // google ads api
  app.post("/admin/ads/google", adminMiddleware, createGoogleAds);
  app.get("/admin/ads/google", adminMiddleware, getGoogleAds);
  app.delete("/admin/ads/google/:id", adminMiddleware, deleteGoogleAds);
  app.patch("/admin/ads/google/:id", adminMiddleware, editGoogleAds);
  app.put("/admin/ads/google/:id", adminMiddleware, updateGoogleAds);

  // admin tax api
  app.post("/admin/tax", adminMiddleware, addTax);
  app.get("/admin/tax", adminMiddleware, getTax);
  app.patch("/admin/tax/:id", adminMiddleware, editTax);
  app.put("/admin/tax/:id", adminMiddleware, updateTax);
};
