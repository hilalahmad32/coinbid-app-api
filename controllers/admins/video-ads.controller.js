import PackagePlan from "../../models/PackagePlan.model.js";
import VideoAds from "../../models/VideoAds.model.js";
import fs from "fs";
import cloudinary from "cloudinary";

export const getVideoAds = async (req, res) => {
  try {
    const video_ads = await VideoAds.find({}).sort({ "_id": -1 });
    return res.send({
      success: true,
      videos: video_ads,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

export const addVideoAds = async (req, res) => {
  try {
    const { title, coins } = req.body;
    // const file = req.file;
    const file = req.files.video;
    let filename = "";
    cloudinary.v2.uploader.upload(file.tempFilePath, {
      resource_type: "video",
      chunk_size: 6000000,
    }, async (err, result) => {
      const videos = new VideoAds({
        title,
        coins,
        // packages,
        video: result.url,
      });
      const data = await videos.save();
      // const plan = await PackagePlan.findById({ _id: packages });
      // plan.banners += 1;
      // await plan.save();
      if (data) {
        return res.send({
          success: true,
          message: "Video Ads add Successfully",
        });
      } else {
        return res.send({
          success: true,
          message: "Server problem",
        });
      }
    });
    // if (file) {
    //   filename = file.filename;
    // }

    // const videos = new VideoAds({
    //   title,
    //   coins,
    //   // packages,
    //   video: url,
    // });
    // const result = await videos.save();
    // // const plan = await PackagePlan.findById({ _id: packages });
    // // plan.banners += 1;
    // // await plan.save();
    // if (result) {
    //   return res.send({
    //     success: true,
    //     message: "Video Ads add Successfully",
    //   });
    // } else {
    //   return res.send({
    //     success: true,
    //     message: "Server problem",
    //   });
    // }
  } catch (error) {
    return res.send({
      success: true,
      message: error.message,
    });
  }
};

export const editVideoAds = async (req, res) => {
  try {
    const id = req.params.id;
    const video_ads = await VideoAds.findById({ _id: id });
    return res.send({
      success: true,
      video: video_ads,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updateVideoAds = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, coins } = req.body;
    const file = req.files.video;
    cloudinary.v2.uploader.upload(file.tempFilePath, {
      resource_type: "video",
      chunk_size: 6000000,
    }, async (err, result) => {
      const videos = await VideoAds.findByIdAndUpdate({ _id: id }, {
        title,
        coins,
        video: result.url,
      });
      // const plan = await PackagePlan.findById({ _id: packages });
      // plan.banners += 1;
      // await plan.save();
      if (videos) {
        return res.send({
          success: true,
          message: "Video Ads Update Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Server problem",
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

export const deleteVideoAds = async (req, res) => {
  try {
    const id = req.params.id;
    VideoAds.findByIdAndDelete({ _id: id }, (err, result) => {
      if (result) {
        return res.send({
          success: true,
          message: "Video Ads Delete Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Some Problem Occured",
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
