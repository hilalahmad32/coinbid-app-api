import PackagePlan from "../../models/PackagePlan.model.js";
import fs from "fs";
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

export const createPackagePlan = async (req, res) => {
  try {
    const { title, price, expire_date } = req.body;
    const file = req.file;
    let filename = "";
    if (file) {
      filename = req.file.filename;
    }

    const packages = new PackagePlan({
      title,
      price,
      expire_date,
      icon: filename,
    });
    const result = await packages.save();
    if (result) {
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
    const { title, price, expire_date, old_image } = req.body;
    const file = req.file;
    let filename = "";
    if (file) {
      filename = req.file.filename;
      if (old_image != "") {
        try {
          fs.unlinkSync("./uploads/" + old_image);
        } catch (error) {
          res.send({
            success: false,
            message: error.message,
          });
        }
      }
    } else {
      filename = old_image;
    }
    const packages = await PackagePlan.findByIdAndUpdate({ _id: id }, {
      title,
      price,
      expire_date,
      icon: filename,
    });
    if (packages) {
      return res.send({
        success: false,
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
          message: "Ads Delete Successfully",
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
