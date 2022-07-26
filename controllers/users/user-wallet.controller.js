import Coin from "../../models/Coin.model.js";
import UserWallet from "../../models/UserWallet.model.js";
import User from "../../models/User.model.js";
import Notification from "../../models/Notification.model.js";

export const getUserWallet = async (req, res) => {
  try {
    const users = req.user_id;
    const wallets = await UserWallet.findOne({ users });
    return res.send({
      success: true,
      wallets: wallets,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const buyCoin = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user_id;
    const coins = await Coin.findById({ _id: id });
    const wallets = await UserWallet.findOne({ user: user_id }).populate(
      "users",
    );
    if (wallets.price >= coins.price) {
      wallets.coins += parseInt(coins.coins);
      wallets.price -= parseInt(coins.price);
      await wallets.save();
      if (wallets) {
        const notification = new Notification({
          users: user_id,
          message: `${wallets.users.name} is buy ${coins.coins}`,
        });
        await notification.save();
        return res.send({
          success: true,
          message: "Coin Buy Successfully",
        });
      }
    } else {
      return res.send({
        success: true,
        message: "Your wallet has less money",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
