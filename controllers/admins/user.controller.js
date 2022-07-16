import User from "../../models/User.model.js";

export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    const totalUsers = await User.count();
    res.send({
      success: true,
      totalUsers,
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
    const { name, email, state, city, mobile, profile } = req.body;
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
        message: "Some Problem Occured",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
