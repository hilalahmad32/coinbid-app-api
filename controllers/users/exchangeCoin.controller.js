import ExchangeCoin from "../../models/ExchangeCoin.model.js";
import Notification from "../../models/Notification.model.js";
import PriceCoin from "../../models/PriceCoin.model.js";
import Report from "../../models/Report.model.js";
import Transaction from "../../models/Transaction.model.js";
import UserWallet from "../../models/UserWallet.model.js";
import Order from "../../models/Order.model.js";

// export const changeCoin = async (req, res) => {
//   try {
//     const { coins } = req.body;
//     const users = req.user_id;
//     const wallet = await UserWallet.findOne({ users }).populate("users");
//     const priceCoin = await PriceCoin.find({});

//     if (coins < 10) {
//       return res.send({
//         success: false,
//         message: "Sorry not Less then 10!",
//       });
//     } else {
//       if (wallet.coins >= coins) {
//         const total_price = (coins / priceCoin[0].coins) * priceCoin[0].price;
//         const exchange = new ExchangeCoin({
//           coins: coins,
//           price: total_price,
//           users: users,
//         });
//         const result = await exchange.save();
//         if (result) {
//           wallet.coins -= parseInt(coins);
//           wallet.price += total_price;
//           await wallet.save();
//           const notification = new Notification({
//             users: users,
//             message: `${wallet.users.name} is Change ${coins}`,
//           });
//           await notification.save();
//           const transaction = new Transaction({
//             users: users,
//             transaction: coins + " coin changed of " + total_price + " INR",
//           });
//           await transaction.save();
//           const report = await Report.find({ users: users }).count();
//           const updateReport = await Report.findOne({ users: users });
//           if (report == 1) {
//             updateReport.converted_coin += parseInt(coins);
//             updateReport.converted_earned += parseInt(total_price);
//             await updateReport.save();
//           } else {
//             const new_report = new Report({
//               users,
//               converted_coin: coins,
//               converted_earned: total_price,
//             });
//             await new_report.save();
//           }

//           return res.send({
//             success: true,
//             message: "Coin Exchange Successfully",
//           });
//         }
//       } else {
//         return res.send({
//           success: false,
//           message: "You Enter More Coin Sorry!",
//         });
//       }
//     }
//   } catch (error) {
//     return res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const changeCoin = async (req, res) => {
  try {
    const users = req.user_id;
    const { coin, price } = req.body;
    const wallet = await UserWallet.findOne({ users });
    console.log(wallet);
    if (wallet.coins > coin) {
      if (!coin || !price) {
        return res.send({
          success: false,
          message: "Please enter required field",
        });
      } else {
        const order = new Order({
          users,
          coin,
          price,
        });
        const orders = await order.save();
        if (orders) {
          wallet.coins -= parseInt(coin);
          await wallet.save();
          return res.send({
            success: true,
            message: "Order Add Successfully",
          });
        } else {
          return res.send({
            success: false,
            message: "Some Problem",
          });
        }
      }
    } else {
      return res.send({
        success: false,
        message: "Your wallet have " + wallet.coins + " Coins",
      });
    }
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};

// delete order after 24hr
export const deleteCoin = async (req, res) => {
  try {
    const users = req.user_id;
    const wallet = await UserWallet.findOne({ users });
    const orders = await Order.find({ users });
    let totalCoins = 0;
    for (var i in orders) {
      totalCoins += parseInt(orders[i].coin);
    }
    wallet.coins += totalCoins;
    await wallet.save();
    const order = await Order.deleteMany({ status: false });
    if (orders) {
      return res.send({
        success: true,
        message: "Order Delete Successfully",
      });
    } else {
      return res.send({
        success: true,
        message: "some problem",
      });
    }
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};
