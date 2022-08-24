import Coin from "../../models/Coin.model.js";
import User from "../../models/User.model.js";

export const getCoin = async (req, res) => {
  try {
    const coins = await Coin.find({}).sort({ "_id": -1 }).populate("users");
    if (coins) {
      return res.send({
        success: true,
        coins: coins,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ "_id": -1 });
    if (users) {
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
export const addCoin = async (req, res) => {
  try {
    const { coins, price, users } = req.body;
    const coin = new Coin({
      coin_id: "Ex " + Math.floor(Math.random() * 1000000),
      coins,
      price,
      users,
    });
    const result = await coin.save();
    if (result) {
      return res.send({
        success: true,
        message: "Coin Add Successfully",
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
export const editCoin = async (req, res) => {
  try {
    const id = req.params.id;
    const coins = await Coin.findById({ _id: id });
    if (coins) {
      return res.send({
        success: true,
        coins: coins,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updateCoin = async (req, res) => {
  try {
    const id = req.params.id;
    const { coins, price, users } = req.body;
    const coin = await Coin.findByIdAndUpdate({ _id: id }, {
      coins,
      price,
      users,
    });
    if (coin) {
      return res.send({
        success: true,
        message: "Coin Update Successfully",
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

export const deleteCoin = async (req, res) => {
  try {
    const id = req.params.id;
    const coin = await Coin.findByIdAndDelete({ _id: id });
    if (coin) {
      return res.send({
        success: true,
        message: "Coin Delete Successfully",
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
