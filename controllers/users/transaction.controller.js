import Transaction from "../../models/Transaction.model.js";
import moment from "moment";
export const getTransaction = async (req, res) => {
  try {
    const users = req.user_id;
    const transactions = await Transaction.find({ users }).populate(
      "from",
      "name profile",
    )
      .sort({ "_id": -1 });
    res.send({
      success: true,
      transactions: transactions,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const yesterdayTransection = async (req, res) => {
  try {
    const users = req.user_id;
    const yesterday = moment().add(-1, "days");
    console.log(new Date(new Date().getTime() - (24 * 60 * 60 * 10000)));
    const transactions = await Transaction.find({
      users,
      created_at: {
        $gt: new Date(new Date().getTime() - (48 * 60 * 60 * 1000)),
        $lt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
      },
    }).populate(
      "from",
      "name profile",
    )
      .sort({ "_id": -1 });
    res.send({
      success: true,
      transactions: transactions,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

export const todayTransection = async (req, res) => {
  try {
    const users = req.user_id;
    var now = new Date();
    const transactions = await Transaction.find({
      users,
      created_at: {
        $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      },
    }).populate(
      "from",
      "name profile",
    )
      .sort({ "_id": -1 });
    res.send({
      success: true,
      transactions: transactions,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};
