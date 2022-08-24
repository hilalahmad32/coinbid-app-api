import Banner from "../../models/Banner.model.js";
import fs from "fs";
import cloudinary from "cloudinary";

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

export const addBanner = async (req, res) => {
  try {
    const { title, color, image } = req.body;
    const file = req.files.image;
    // let filename = "";
    // if (file) {
    //   filename = req.file.filename;
    // }
    cloudinary.v2.uploader.upload(file.tempFilePath, async (err, result) => {
      const banners = new Banner({
        image: result.url,
        title,
        color,
      });
      const data = await banners.save();
      if (data) {
        return res.send({
          success: true,
          message: "Banner add Successfully",
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

export const updateBanner = async (req, res) => {
  try {
    const _id = req.params.id;
    const { title, color } = req.body;

    const file = req.files.image;
    // const { old_image } = req.body;
    // let filename = "";
    // if (file) {
    //   filename = req.file.filename;
    //   try {
    //     fs.unlinkSync("./uploads/" + old_image);
    //   } catch (error) {
    //     res.send({
    //       success: false,
    //       message: error.message,
    //     });
    //   }
    // } else {
    //   filename = old_image;
    // }
    cloudinary.v2.uploader.upload(file.tempFilePath, async (err, result) => {
      const banners = await Banner.findByIdAndUpdate({ _id }, {
        image: result.url,
        title,
        color,
      });
      if (banners) {
        return res.send({
          success: true,
          message: "Banner Update Successfully",
        });
      }
    });
  } catch (error) {
    return res.send({
      success: true,
      message: error.message,
    });
  }
};

export const editBanner = async (req, res) => {
  try {
    const _id = req.params.id;
    const banners = await Banner.findById({ _id });
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

export const deleteBanner = async (req, res) => {
  try {
    const _id = req.params.id;
    Banner.findByIdAndDelete({ _id }, (err, result) => {
      // if (result.image != "") {
      //   try {
      //     fs.unlinkSync("./uploads/" + result.image);
      //   } catch (error) {
      //     res.send(error);
      //   }
      // }
      if (result) {
        return res.send({
          success: true,
          message: "Banner Delete Successfully",
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
      success: true,
      message: error.message,
    });
  }
};
