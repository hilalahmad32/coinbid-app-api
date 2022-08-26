import PackagePlan from "../../models/PackagePlan.model.js";
import fs from "fs";
import Ads from "../../models/Ads.model.js";
import UserWallet from "../../models/UserWallet.model.js";
import Report from "../../models/Report.model.js";
import VideoAds from "../../models/VideoAds.model.js";

export const getAds = async (req, res) => {
  try {
    const ads = await Ads.find({}).sort({ "_id": -1 }).populate("packages");
    const packages = await PackagePlan.find({});
    res.send({
      success: true,
      ads: ads,
      packages: packages,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updateAds = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, old_image, new_package, old_package } = req.body;
    const files = req.files;
    let filenames = [];
    if (files != "") {
      for (var i in files) {
        filenames.push(files[i].filename);
      }
      const images = JSON.parse(old_image);
      images.map((val) => {
        try {
          fs.unlinkSync("./uploads/" + val);
        } catch (error) {
          res.send({
            success: false,
            message: error.message,
          });
        }
      });
    } else {
      filenames = old_image;
    }
    const json_image = files != "" ? JSON.stringify(filenames) : old_image;
    const ads = await Ads.findByIdAndUpdate({ _id: id }, {
      title,
      price,
      images: json_image,
      packages: new_package,
    });
    const old_pack = await PackagePlan.findById({ _id: old_package });
    const new_pack = await PackagePlan.findById({ _id: new_package });
    if (new_package != old_package) {
      old_pack.ads >= 1 ? old_pack.ads -= 1 : "";
      new_pack.ads >= 0 ? new_pack.ads += 1 : "";
    }
    await old_pack.save();
    await new_pack.save();
    if (ads) {
      return res.send({
        success: true,
        message: "Ads add Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Not addAds add Successfully",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const addAds = async (req, res) => {
  try {
    const { title, price, packages, users } = req.body;
    const video = req.files.video;
    const files = req.files;
    let filenames = [];
    if (files) {
      for (let i in files) {
        filenames.push(files[i].filename);
      }
    } else {
      filenames = "";
    }
    const json_image = JSON.stringify(filenames);

    const ads = new Ads({
      title,
      price,
      users,
      images: json_image,
      packages,
    });
    const ad = await ads.save();
    const plan = await PackagePlan.findById({ _id: packages });
    if (plan.ads == plan.total_ads) {
      return res.send({
        success: false,
        message: "Only " + plan.total_ads + " ads for one package",
      });
    } else {
      plan.ads += 1;
      await plan.save();
    }
    if (ad) {
      return res.send({
        success: true,
        message: "Ads add Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Not addAds add Successfully",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const editAds = async (req, res) => {
  try {
    const id = req.params.id;
    const ads = await Ads.findById({ _id: id });
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

export const deleteAds = async (req, res) => {
  try {
    const id = req.params.id;
    Ads.findByIdAndDelete({ _id: id }, (err, result) => {
      if (result.images != "") {
        const images = JSON.parse(result.images);
        images.map((val) => {
          try {
            fs.unlinkSync("./uploads/" + val);
          } catch (error) {
            res.send(error);
          }
        });
      }
      if (result) {
        return res.send({
          success: true,
          message: "Ads Delete Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Some Problem Occured",
        });
      }
    });
    // const ad = await Ads.findById({ _id: id });
    // const data = JSON.parse(ad.images);
    // if (data.length > 0) {
    //   data.map((val) => {
    //     const path = "http://localhost:5000/uploads/" + val;
    //     fs.unlinkSync(path, () => {
    //       if (err) return err;
    //     });
    //   });
    // }
    // const ad1 = await Ads.findByIdAndDelete({ _id: id });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// unwatched ads
export const unWatchedAds = async (req, res) => {
  try {
    const ads = await Ads.find({ status: 0 });
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

// watch ads
export const watchedAds = async (req, res) => {
  try {
    const users = req.user_id;
    const ads = await Ads.find({ status: 1 }).limit(5);
    const wallet = await UserWallet.findOne({ users });
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

// user watched ads
export const userWatchedAds = async (req, res) => {
  try {
    const users = req.user_id;
    // const _id = req.params.id;
    const video_id = req.params.id;

    // console.log(video_id);
    // if (_id) {
    //   const ads = await Ads.findById({ _id });
    //   const wallet = await UserWallet.findOne({ users });
    //   wallet.coins += parseInt(ads.coins);
    //   await wallet.save();
    //   const report = await Report.find({ users: users }).count();
    //   const updateReport = await Report.findOne({ users: users });
    //   if (report == 1) {
    //     updateReport.ads_watch += 1;
    //     updateReport.coin_earned = parseInt(wallet.coins);
    //     updateReport.today_coin_earned += parseInt(ads.coins);
    //     await updateReport.save();
    //   } else {
    //     const new_report = new Report({
    //       users,
    //       updateReport: 1,
    //     });
    //     await new_report.save();
    //   }
    //   return res.send({
    //     success: true,
    //     "message": "Ads watcheds",
    //   });
    // } else {
    const ads = await VideoAds.findById({ _id: video_id });
    const wallet = await UserWallet.findOne({ users });
    wallet.coins += parseInt(ads.coins);
    await wallet.save();
    const report = await Report.find({ users: users }).count();
    const updateReport = await Report.findOne({ users: users });
    if (report == 1) {
      updateReport.ads_watch += 1;
      updateReport.coin_earned = parseInt(wallet.coins);
      updateReport.today_coin_earned += parseInt(ads.coins);
      await updateReport.save();
    } else {
      const new_report = new Report({
        users,
        ads_watch: 1,
        coin_earned: parseInt(wallet.coins),
        today_coin_earned: parseInt(ads.coins),
      });
      await new_report.save();
    }
    return res.send({
      success: true,
      "message": "Ads watcheds",
    });
    // }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
