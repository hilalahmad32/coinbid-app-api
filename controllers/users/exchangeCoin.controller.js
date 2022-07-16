import ExchangeCoin from "../../models/ExchangeCoin.model.js";
import PriceCoin from "../../models/PriceCoin.model.js";
import UserWallet from "../../models/UserWallet.model.js";

export const changeCoin = async (req, res) => {
  try {
    const { coins } = req.body;
    const users = req.user_id;
    const wallet = await UserWallet.findOne({ users });
    const priceCoin = await PriceCoin.find({});
    if (coins < 10) {
      return res.send({
        success: false,
        message: "Sorry not Less then 10!",
      });
    } else {
      if (wallet.coins >= coins) {
        const totalprice = (coins / priceCoin[0].coins) * priceCoin[0].price;
        const exchange = new ExchangeCoin({
          coins: coins,
          price: totalprice,
          users: users,
        });
        const result = await exchange.save();
        if (result) {
          wallet.coins -= parseInt(coins);
          wallet.price += parseInt(totalprice);
          await wallet.save();
          return res.send({
            success: true,
            message: "Coin Exchange Successfully",
          });
        }
      } else {
        return res.send({
          success: false,
          message: "You Enter More Coin Sorry!",
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
