import User from "../../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserWallet from "../../models/UserWallet.model.js";
import BounesCoin from "../../models/Bounes.model.js";
import Notification from "../../models/Notification.model.js";
import fs from "fs";

// mail confiraton
const transporter = nodemailer.createTransport({
  service: "google",
  host: "smtp.gmail.com",
  port: 587,
  starttls: {
    enable: true,
  },
  secureConnection: true,
  auth: {
    user: "programmerhero6@gmail.com",
    pass: "bqdzvhhogwnmfgak",
  },
  from: "progammerhero6@gamil.com",
});

// const mailOptions = {
//   from: "hakofficial05@gmail.com",
//   to: "programmerhero6@gmail.com",
//   subject: "testing mail",
//   text: "mail is sends",
// };

export const createUser = async (req, res) => {
  try {
    const { name, email, password, contact, is_social, profile } = req.body;
    const is_email = await User.findOne({ email });
    if (is_social) {
      if (is_email) {
        const user_id = { user_id: result._id };
        const token = jwt.sign(
          user_id,
          "HILALAHMADISAFULLSTACKDEVELOPER",
          {
            expiresIn: "1day",
          },
        );
        return res.send({
          success: true,
          token,
          message: "Login Successfully",
        });
      } else {
        const users = new User({
          name,
          email,
          profile,
          contact: "",
          is_social,
        });
        const result = await users.save();
        const coins = await BounesCoin.find({});
        const wallets = new UserWallet({
          coins: coins[0].coins,
          users: result._id,
          price: 0,
        });
        await wallets.save();

        const user_id = { user_id: result._id };
        const token = jwt.sign(
          user_id,
          "HILALAHMADISAFULLSTACKDEVELOPER",
          {
            expiresIn: "1day",
          },
        );
        return res.send({
          success: true,
          token,
          message: "Login Successfully",
        });
      }
    } else {
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
          contact,
        });
        const result = await users.save();
        const coins = await BounesCoin.find({});
        const wallets = new UserWallet({
          coins: coins[0].coins,
          users: result._id,
          price: 0,
        });
        await wallets.save();
        if (result) {
          const notification = new Notification({
            users: result._id,
            message: `New ${name} User are Signup`,
          });
          await notification.save();
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
    if (users.is_social) {
      return res.send({
        success: false,
        message: "You are login with google",
      });
    } else {
      if (users) {
        const compare_password = await bcryptjs.compare(
          password,
          users.password,
        );
        if (compare_password) {
          const user_id = { user_id: users._id };
          const token = jwt.sign(
            user_id,
            "HILALAHMADISAFULLSTACKDEVELOPER",
            {
              expiresIn: "1day",
            },
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
      // mskexucbtcpkfwej
      const mailOptions = {
        from: "programmerhero6@gmail.com",
        to: `${users.email}`,
        subject: "testing mail",
        text: `<h1>this is your otp ${users.otp}</h1>`,
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
        const notification = new Notification({
          users: users._id,
          message: `${users.name} is verified Our Account`,
        });
        await notification.save();
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

// export const updateProfile = async (req, res) => {
//   try {
//     const _id = req.user_id;
//     const { name, birth_date, state, city, mobile, old_image } = req.body;
//     const profile = req.file;
//     let filename = "";
//     if (profile != "") {
//       filename = req.file.filename;
//       // if (old_image != "") {
//       //   try {
//       //     fs.unlinkSync("./uploads/users/" + old_image);
//       //   } catch (error) {
//       //     res.send({
//       //       success: false,
//       //       message: error.message,
//       //     });
//       //   }
//       // }
//     } else {
//       filename = old_image;
//     }
//     const users = await User.findByIdAndUpdate({ _id }, {
//       name,
//       birth: birth_date,
//       state,
//       city,
//       mobile,
//       profile: filename,
//     });
//     if (users) {
//       return res.send({
//         success: true,
//         message: "Profile update Successfully",
//       });
//     } else {
//       return res.send({
//         success: false,
//         message: "Some Problem Occured",
//       });
//     }
//   } catch (error) {
//     return res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const _id = req.user_id;
    const { name, birth_date, state, city, mobile, profile } = req.body;
    // const profile = req.file;
    // let filename = "";
    // if (profile != "") {
    //   filename = req.file.filename;
    //   // if (old_image != "") {
    //   //   try {
    //   //     fs.unlinkSync("./uploads/users/" + old_image);
    //   //   } catch (error) {
    //   //     res.send({
    //   //       success: false,
    //   //       message: error.message,
    //   //     });
    //   //   }
    //   // }
    // } else {
    //   filename = old_image;
    // }
    const users = await User.findByIdAndUpdate({ _id }, {
      name,
      birth: birth_date,
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

export const changePassword = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { password, new_password } = req.body;
    const users = await User.findById({ _id: user_id });
    const hash_password = await bcryptjs.hash(new_password, 10);
    const compare_password = await bcryptjs.compare(password, users.password);
    if (compare_password) {
      users.password = hash_password;
      await users.save();
      return res.send({
        success: true,
        message: "Password change Successfully",
      });
    } else {
      return res.send({
        success: true,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// export const forgetPassword = async (req, res) => {
//   try {
//     const user_id = req.user_id;
//     const { email } = req.body;
//     const users = await User.findById({ _id: user_id });

//     const hash_password = await bcryptjs.hash(new_password, 10);
//     const compare_password = await bcryptjs.compare(password, users.password);
//     if (users.email == is_email) {
//       users.password = hash_password;
//       await users.save();
//       return res.send({
//         success: true,
//         message: "Password change Successfully",
//       });
//     } else {
//       return res.send({
//         success: true,
//         message: "Invalid Password",
//       });
//     }
//   } catch (error) {
//     return res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await User.findOne({ email });
    const random_password = Math.floor(Math.random() * 1000000);
    const hash_password = await bcryptjs.hash(random_password.toString(), 12);
    if (users.email == email) {
      users.password = hash_password;
      await users.save();
      const mailOptions = {
        from: "programmerhero6@gmail.com",
        to: `${users.email}`,
        subject: "Changing Password",
        html: `<h1>Your password ${random_password}</h1>`,
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
    } else {
      return res.send({
        success: true,
        message: "Email not found",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// google login
// Auth Routes
