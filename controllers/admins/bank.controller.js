import Bank from "../../models/Bank.model.js";

export const getBanks = async (req, res) => {
  try {
    const banks = await Bank.find({}).populate("users");
    res.send({
      success: true,
      banks: banks,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardBanks = async (req, res) => {
  try {
    const banks = await Bank.find({}).populate("users").limit(5).sort([
      ["_id", -1],
    ]);
    res.send({
      success: true,
      banks: banks,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const unpaid = async (req, res) => {
  try {
    const banks = await Bank.find({ status: "pending" }).populate("users").sort(
      { "_id": -1 },
    );
    res.send({
      success: true,
      banks: banks,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const paid = async (req, res) => {
  try {
    const banks = await Bank.find({ status: "Approved" }).populate("users")
      .sort({ "_id": -1 });
    res.send({
      success: true,
      banks: banks,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const byDate = async (req, res) => {
  try {
    const banks = await Bank.find({}).sort({
      "created_at": -1,
    }).populate("users");
    res.send({
      success: true,
      banks: banks,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
