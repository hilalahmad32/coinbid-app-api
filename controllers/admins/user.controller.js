import User from "../../models/User.model.js";
import cloudinary from "cloudinary";
export const getUser = async (req, res) => {
  try {
    const limit = req.query.limit || 200;
    const page = req.query.page;
    const page_index = (page - 1) * limit;
    const users = await User.find({}).sort({ "_id": -1 }).limit(limit).skip(
      page_index,
    ).exec();
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const totalUser = async (req, res) => {
  try {
    const users = await User.count();
    console.log(users);
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findById({ _id: id });
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, state, city, mobile } = req.body;
    const file = req.files.profile;
    cloudinary.v2.uploader.upload(file.tempFilePath, async (err, result) => {
      const users = await User.findByIdAndUpdate({ _id: id }, {
        name,
        email,
        state,
        city,
        mobile,
        profile,
      });
      if (users) {
        return res.send({
          success: true,
          message: "User update Successfully",
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

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findByIdAndDelete({ _id: id });
    if (users) {
      return res.send({
        success: true,
        message: "User Delete Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some Problem Occurred",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
