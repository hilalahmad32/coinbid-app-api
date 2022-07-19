import PackagePlan from "../../models/PackagePlan.model.js";
import fs from "fs";
import Ads from "../../models/Ads.model.js";
import UserWallet from "../../models/UserWallet.model.js";

export const getAds = async (req, res) => {
  try {
    const ads = await Ads.find({}).populate("packages");
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
      old_pack.banners >= 1 ? old_pack.banners -= 1 : "";
      new_pack.banners >= 0 ? new_pack.banners += 1 : "";
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
    const { title, price, packages } = req.body;
    const video = req.files.video[0].filename;
    console.log(video);
    const files = req.files.images;
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
      images: json_image,
      packages,
      video,
    });
    console.log(ads);
    const ad = await ads.save();
    const plan = await PackagePlan.findById({ _id: packages });
    plan.banners += 1;
    await plan.save();
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
    const ads = await Ads.find({ status: 0 }).limit(5);
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
    const _id = req.params.id;
    const ads = await Ads.findByIdAndUpdate({ _id }, {
      status: 1,
    });
    const wallet = await UserWallet.findOne({ users });
    wallet.coins += parseInt(ads.price);
    await wallet.save();
    return res.send({
      success: true,
      "message": "Ads watcheds",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
