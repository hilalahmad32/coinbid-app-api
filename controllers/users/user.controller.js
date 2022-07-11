import User from "../../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// mail confiraton
const transporter = nodemailer.createTransport({
  // service: "gmail",
  // auth: {
  //   xoauth2gen: xoauth2.createXOAuth2Generator({
  //     user: "programmerhero6@gmail.com",
  //     clientId: "938269283248-l2hpd749696itb20hjmjj0u7vgqbftkb.apps.googleusercontent.com",
  //     clientSecret: "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",
  //     refreshToken: "{User Refresh Token}",
  //   }),
  //   email: "programmerhero6@gmail.com",
  //   pass: "programmerhero123_321",
  // },
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "88756bf727da7b",
    pass: "142c913fbdc2f5",
  },
});

const mailOptions = {
  from: "hakofficial05@gmail.com",
  to: "programmerhero6@gmail.com",
  subject: "testing mail",
  text: "mail is sends",
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const is_email = await User.findOne({ email });
    if (is_email) {
      return res.send({
        success: false,
        message: "Email already Exist",
      });
    } else {
      const hash_password = await bcryptjs.hash(password, 12);
      const users = new User({
        name,
        email,
        password: hash_password,
      });
      const result = await users.save();
      if (result) {
        return res.send({
          success: true,
          message: "Account Create Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Server Problem",
        });
      }
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findOne({ email });
    if (users) {
      const compare_password = await bcryptjs.compare(
        password,
        users.password,
      );
      if (compare_password) {
        const user_id = { user_id: users._id };
        const token = jwt.sign(
          user_id,
          process.env.SECRET_KEY,
        );
        res.cookie("user_access_token", token, {
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
        message: "Invalid Username And Passwor",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// get user
export const getUser = async (req, res) => {
  try {
    const user_id = req.user_id;
    const users = await User.findById({ _id: user_id }).select("-password");
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

// send otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await User.findOne({ email });
    if (!users) {
      return res.send({
        success: false,
        message: "Email is not found",
      });
    } else {
      users.otp = Math.floor(Math.random() * 100000);
      await users.save();
      const mailOptions = {
        from: "hakofficial05@gmail.com",
        to: "programmerhero6@gmail.com",
        subject: "testing mail",
        text: `this is your otp ${users.otp}`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.send({
            success: false,
            message: err.message,
          });
        } else {
          res.send({
            success: true,
            message: "Check your email",
          });
        }
      });
    }
    // if (users) {
    //   const userEmail = users.email;
    //   if (email == userEmail) {
    //     const mailOptions = {
    //       from: "hakofficial05@gmail.com",
    //       to: "programmerhero6@gmail.com",
    //       subject: "testing mail",
    //       text: `this is your otp ${users.otp}`,
    //     };
    //     const newOtp = await User.findByIdAndUpdate({ _id: req.user_id }, {
    //       otp: Math.floor(Math.random() * 100000),
    //     });
    //     console.log(newOtp);
    //     transporter.sendMail(mailOptions, (err, info) => {
    //       if (err) {
    //         res.send({
    //           success: false,
    //           message: err.message,
    //         });
    //       } else {
    //         res.send({
    //           success: true,
    //           otp: users.otp,
    //           message: "Check your email",
    //         });
    //       }
    //     });
    //   } else {
    //     return res.send({
    //       success: false,
    //       message: "Email not found",
    //     });
    //   }
    // } else {
    //   return res.send({
    //     success: false,
    //     message: "Unauthenticated",
    //   });
    // }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const optVerification = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      res.send({
        success: false,
        message: "otp Filed is required",
      });
    } else {
      const users = await User.findOne({ otp });
      if (users) {
        users.verified = 1;
        await users.save();
        res.send({
          success: true,
          message: "Email verificaction Sucessfully",
        });
      } else {
        res.send({
          success: false,
          message: "Invalid Otp",
        });
      }
    }
  } catch (errors) {
    return res.send({
      success: false,
      message: errors.message,
    });
  }
};

export const getUserEdit = async (req, res) => {
  try {
    const _id = req.user_id;
    if (_id != null) {
      const users = await User.findById({ _id }).select(
        "-password -otp -verified",
      );
      return res.send({
        success: true,
        users: users,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const _id = req.user_id;
    const { name, email, state, city, mobile, profile } = req.body;
    const users = await User.findByIdAndUpdate({ _id }, {
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
        message: "Profile update Successfully",
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
