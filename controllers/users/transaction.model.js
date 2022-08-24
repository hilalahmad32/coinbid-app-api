import Transaction from "../../models/Transaction.model.js";

export const getTransaction = async (req, res) => {
  try {
    const users = req.user_id;
    const transactions = await Transaction.find({ users }).sort({ "_id": -1 })
      .populate(["users", "from"]);
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
