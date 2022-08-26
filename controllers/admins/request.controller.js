import Bank from "../../models/Bank.model.js";
import Notification from "../../models/Notification.model.js";
import Transaction from "../../models/Transaction.model.js";
import UserWallet from "../../models/UserWallet.model.js";
import WithDrawRequest from "../../models/WithdrawRequest.model.js";

export const getRequest = async (req, res) => {
  try {
    const withrequests = await WithDrawRequest.find({});
    if (withrequests) {
      return res.send({
        success: true,
        requests: requests,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// export const withRequest = async (req, res) => {
//   try {
//     const users = req.user_id;
//     const { money } = req.body;
//     const wallet = await UserWallet.findOne({ users });
//     if (wallet.price >= money) {
//       const withdraws = new WithDrawRequest({
//         money,
//         users,
//       });
//       const result = await withdraws.save();
//       if (result) {
//         wallet.price -= parseInt(money);
//         await wallet.save();
//         return res.send({
//           success: true,
//           message: "Request send successfully",
//         });
//       } else {
//         return res.send({
//           success: false,
//           message: "Request send failed",
//         });
//       }
//     } else {
//       return res.send({
//         success: false,
//         message: `Your wallet have only ${wallet.price} money `,
//       });
//     }
//   } catch (error) {
//     return res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const withRequest = async (req, res) => {
  try {
    const users = req.user_id;
    const { money } = req.body;
    const wallet = await UserWallet.findOne({ users }).populate("users");
    const banks = await Bank.findOne({ users });
    if (!banks) {
      return res.send({
        success: false,
        message: "Please add bank first then exchange the coins",
      });
    } else {
      if (money <= wallet.price) {
        // const bank = await Bank.findOne({ users });
        // bank.amount += parseInt(money);
        // const result = await bank.save();
        // if (result) {
        wallet.price -= parseInt(money);
        await wallet.save();
        const notification = new Notification({
          users: users,
          message: `${wallet.users.name} want to withdraw money`,
        });
        await notification.save();
        const transaction = new Transaction({
          users: users,
          transaction: money + " INR Requested",
          received: false,
        });
        await transaction.save();

        banks.amount += parseInt(money);
        await banks.save();
        return res.send({
          success: true,
          message: "Request send successfully",
        });
        // }
      } else {
        return res.send({
          success: false,
          message: `Your wallet have only ${wallet.price} money `,
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

export const ApproveRequest = async (req, res) => {
  try {
    const _id = req.params.id;
    const banks = await Bank.findByIdAndUpdate({ _id }, {
      status: "Approved",
    });

    if (banks) {
      const notification = new Notification({
        users: banks.users,
        message: `Your have account has been ${banks.status}`,
      });
      await notification.save();
      return res.send({
        success: true,
        message: "Approved Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some Problem",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
export const rejectedRequest = async (req, res) => {
  try {
    const _id = req.params.id;
    const banks = await Bank.findByIdAndUpdate({ _id }, {
      status: "Rejected",
    });

    if (banks) {
      const notification = new Notification({
        users: banks.users,
        message: `Your have account has been ${banks.status}`,
      });
      await notification.save();
      return res.send({
        success: false,
        message: "Rejected Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some Problem",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ "_id": -1 })
      .populate("users");
    return res.send({
      success: true,
      transactions: transactions,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
