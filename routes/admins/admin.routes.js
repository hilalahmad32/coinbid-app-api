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
  rejectedRequest,
} from "../../controllers/admins/request.controller.js";

import {
  getNotifications,
} from "../../controllers/admins/notification.controller.js";
import { verify } from "../../controllers/admins/csvVerification.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
export default (app) => {
  app.post("/admin/login", adminLogin);
  app.get("/admin", adminMiddleware, admin);
  app.get("/admin/users", adminMiddleware, getUser);
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
    upload.fields([{ name: "images", maxCount: 10 }, {
      name: "video",
      maxCount: 1,
    }]),
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
    upload.single("image"),
    addBanner,
  );
  app.get("/admin/banner", adminMiddleware, getBanner);
  app.delete("/admin/banner/:id", adminMiddleware, deleteBanner);
  app.patch("/admin/banner/:id", adminMiddleware, editBanner);
  app.put(
    "/admin/banner/:id",
    adminMiddleware,
    upload.single("image"),
    updateBanner,
  );

  // user with draw
  app.get("/admin/withdraws/request", adminMiddleware, getRequest);
  app.put("/admin/bank/approve/:id", adminMiddleware, ApproveRequest);
  app.put("/admin/bank/rejected/:id", adminMiddleware, rejectedRequest);
  app.get("/admin/notification", adminMiddleware, getNotifications);
  app.post("/admin/verify", adminMiddleware, upload.single("file"), verify);
};
