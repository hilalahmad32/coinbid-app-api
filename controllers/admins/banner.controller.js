import Banner from "../../models/Banner.model.js";

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
    const file = req.file;
    let filename = "";
    if (file) {
      filename = req.file.filename;
    }
    const banners = new Banner({
      banner: filename,
    });
    const result = await banners.save();
    if (result) {
      return res.send({
        success: true,
        message: "Banner add Successfully",
      });
    }
  } catch (error) {
    return res.send({
      success: true,
      message: error.message,
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const _id = req.params.id;
    const file = req.file;
    const { old_image } = req.body;
    let filename = "";
    if (file) {
      filename = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + old_image);
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
    } else {
      filename = old_image;
    }
    const banners = await Banner.findByIdAndUpdate({ _id }, {
      banner: filename,
    });
    if (banners) {
      return res.send({
        success: true,
        message: "Banner Update Successfully",
      });
    }
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
      if (result.banner != "") {
        try {
          fs.unlinkSync("./uploads/" + val);
        } catch (error) {
          res.send(error);
        }
      }
      if (result) {
        return res.send({
          success: true,
          message: "Banner Delete Successfully",
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
      success: true,
      message: error.message,
    });
  }
};
