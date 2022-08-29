import Ads from "../../models/Ads.model.js";
import Banner from "../../models/Banner.model.js";
import Coin from "../../models/Coin.model.js";
import PackagePlan from "../../models/PackagePlan.model.js";
import SubscribePlan from "../../models/SubScription.model.js";
import UserWallet from "../../models/UserWallet.model.js";
import VideoAds from "../../models/VideoAds.model.js";
import GoogleAds from "../../models/GoogleAds.model.js";
import User from "../../models/User.model.js";
import Order from "../../models/Order.model.js";
import Report from "../../models/Report.model.js";
import cron from "node-cron";

export const getAds = async (req, res) => {
  try {
    const ads = await Ads.find({}).populate("packages");
    res.send({
      success: true,
      ads: ads,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
export const getVideoAds = async (req, res) => {
  try {
    const users = req.user_id;
    const total_count = await VideoAds.find({}).count();
    // let limitrecords = 5;

    // function getRandomArbitrary() {
    //   return Math.ceil(Math.random() * total_count);
    // }
    // var skipRecords = getRandomArbitrary();
    // const video_ads = await VideoAds.find({}).sort({ "_id": -1 }).skip(
    //   total_count,
    // ).limit(-7);
    var random = Math.floor(Math.random() * total_count);
    // const video_ads = await VideoAds.find({}).sort({ "_id": -1 })
    //   .limit(5).skip(random);
    // const total_ads = await VideoAds.find({}).sort({ "_id": -1 })
    //   .limit(5).skip(random).count();
    const wallet = await UserWallet.findOne({ users });
    const size = 5;
    const total_size = size - wallet.counter;
    if (wallet.counter != 5) {
      if (wallet.users == users && wallet.counter > 0) {
        const video_ads = await VideoAds.aggregate([{
          $sample: { size: total_size },
        }]).sort({ "_id": -1 });
        return res.send({
          success: true,
          // total_ads: total_ads,
          videos: video_ads,
        });
      } else {
        const video_ads = await VideoAds.aggregate([{
          $sample: { size: 5 },
        }]).sort({ "_id": -1 });
        return res.send({
          success: true,
          // total_ads: total_ads,
          videos: video_ads,
        });
      }
    } else {
      return res.send({
        success: false,
        message: "Today 5 ads completed",
      });
    }
    // const total_ads = await VideoAds.aggregate([{
    //   $sample: { size: 1 },
    // }]).count();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
export const getPackageplan = async (req, res) => {
  try {
    const packages = await PackagePlan.find({});
    return res.send({
      success: true,
      packages: packages,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find({});
    return res.send({
      success: true,
      banners: banners,
    });
  } catch (error) {
    return res.send({
      success: true,
      message: error.message,
    });
  }
};

export const getCoin = async (req, res) => {
  try {
    // const users = req.user_id;
    // const count = await Coin.find({ users }).count();
    // var random = Math.floor(Math.random() * count);
    // const coins = await Coin.find({ users }).skip(random).limit(
    //   50,
    // );
    // const users = await User.find({}).count();
    // const orders = await Order.find({}).count();
    const orders = await Order.aggregate([{
      $sample: { size: 50 },
    }]).sort({
      "_id": -1,
    });
    // const totalData = Math.ceil(orders / users);
    // const showCoins = coins.slice(0, totalData);
    // console.log(showCoins);
    if (orders) {
      return res.send({
        success: true,
        orders: orders,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const subscribePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const users = req.user_id;
    if (!id) {
      return res.send({
        success: false,
        message: "Id Not found",
      });
    } else {
      // const planSub = await PackagePlan.findById({ _id: id });
      const isSubPlan = await SubscribePlan.findOne({
        users,
      });
      if (isSubPlan) {
        // isSubPlan.status = true;
        // await isSubPlan.save();
        return res.send({
          success: false,
          message: "You have one  subscribe a package",
        });
      } else {
        const sub = new SubscribePlan({
          users,
          packages: id,
          status: true,
        });
        await sub.save();
        const report = await Report({
          packages: id,
          users: users,
        });
        await report.save();
        return res.send({
          success: true,
          message: "package Subscribe Successfully",
        });
      }
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const cancelPlan = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.send({
        success: false,
        message: "Id Not found",
      });
    } else {
      const planSub = await SubscribePlan.findById({ _id: id });
      planSub.status = false;
      await planSub.save();
      return res.send({
        success: true,
        message: "Package Cancel Successfully Admin will refound your payment",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getSubscribePlan = async (req, res) => {
  try {
    const users = req.user_id;
    const packages = await SubscribePlan.find({ users, status: true }).populate(
      ["packages"],
    );
    return res.send({
      success: true,
      packages: packages,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
export const getCancelPlan = async (req, res) => {
  try {
    const packages = await SubscribePlan.find({ status: false });
    return res.send({
      success: true,
      packages: packages,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getGoogleAds = async (req, res) => {
  try {
    const ads = await GoogleAds.find({}).sort({ "_id": -1 });
    return res.send({
      success: true,
      ads: ads,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// delete ads after 24hr
export const removeAdsCounter = async (req, res) => {
  try {
    const users = req.user_id;
    const wallet = await UserWallet.findOne({ users });
    wallet.counter = 0;
    await wallet.save();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
