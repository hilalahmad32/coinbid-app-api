import AdminModel from "../../models/Admin.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminCount = await AdminModel.count({});
    if (adminCount == 1) {
      const admins = await AdminModel.findOne({ username: username });
      if (admins) {
        const compare_password = await bcryptjs.compare(
          password,
          admins.password,
        );
        if (compare_password) {
          const admin_id = { admin_id: admins._id };
          const token = jwt.sign(
            admin_id,
            "HILALAHMADISAFULLSTACKDEVELOPER",
            {
              expiresIn: "1day",
            },
          );
          res.cookie("admin_access_token", token, {
            httpOnly: true,
          });
          return res.send({
            success: true,
            token,
            message: "Login Successfully",
          });
        } else {
          return res.send({
            success: false,
            message: "Invalid Username And Password",
          });
        }
      } else {
        return res.send({
          success: false,
          message: "Invalid Username And Password",
        });
      }
    } else {
      const hash_password = await bcryptjs.hash(password, 12);
      const admin = new AdminModel(
        {
          username: username,
          password: hash_password,
        },
      );
      admin.save();
    }
  } catch (error) {
    return res.send({
      "success": false,
      "message": error.message,
    });
  }
};

export const admin = async (req, res) => {
  try {
    const admins = await AdminModel.findById({ _id: req.admin_id }).select(
      "-password",
    );
    console.log(admins);
    return res.send({
      "success": true,
      "admins": admins,
    });
  } catch (error) {
    return res.send({
      "success": false,
      "message": error.message,
    });
  }
};
