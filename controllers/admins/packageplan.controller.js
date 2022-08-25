import PackagePlan from "../../models/PackagePlan.model.js";
import fs from "fs";
import Ads from "../../models/Ads.model.js";
import cloudinary from "cloudinary";
export const getPackageplan = async (req, res) => {
  try {
    const packages = await PackagePlan.find({}).sort({ "_id": -1 });
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

export const createPackagePlan = async (req, res) => {
  try {
    const { title, price, expire_date, coins, recommended } = req.body;
    const file = req.files.image;
    // let filename = "";
    // if (file) {
    //   filename = req.file.filename;
    // }
    cloudinary.v2.uploader.upload(file.tempFilePath, async (err, result) => {
      const packages = new PackagePlan({
        title,
        price,
        expire_date,
        coins,
        recommended,
        icon: result.url,
      });
      const data = await packages.save();
      if (data) {
        return res.send({
          success: true,
          message: "Package Add Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Some problem",
        });
      }
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updatePackagePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, expire_date, recommended, coins } = req.body;
    // const file = req.file;
    // let filename = "";
    // if (file) {
    //   filename = req.file.filename;
    //   if (old_image != "") {
    //     try {
    //       fs.unlinkSync("./uploads/" + old_image);
    //     } catch (error) {
    //       res.send({
    //         success: false,
    //         message: error.message,
    //       });
    //     }
    //   }
    // } else {
    //   filename = old_image;
    // }
    const packages = await PackagePlan.findByIdAndUpdate({ _id: id }, {
      title,
      price,
      expire_date,
      coins,
      recommended,
    });
    if (packages) {
      return res.send({
        success: true,
        message: "Package Update Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some problem",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const editPackageplan = async (req, res) => {
  try {
    const packages = await PackagePlan.findById({ _id: req.params.id });
    if (packages) {
      return res.send({
        success: true,
        packages: packages,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const deletePackageplan = async (req, res) => {
  try {
    const _id = req.params.id;
    await Ads.findOneAndDelete({ packages: _id });
    PackagePlan.findByIdAndDelete({ _id }, (err, result) => {
      // if (result.icon != "") {
      //   try {
      //     fs.unlinkSync("./uploads/" + result.icon);
      //   } catch (error) {
      //     return res.send(error);
      //   }
      // }
      if (result) {
        return res.send({
          success: true,
          message: "Package Delete Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Some Problem Occurred",
        });
      }
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const refound = async (req, res) => {
  try {
    // const req
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
