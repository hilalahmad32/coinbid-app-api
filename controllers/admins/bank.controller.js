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
