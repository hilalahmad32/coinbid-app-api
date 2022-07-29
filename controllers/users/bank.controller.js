import Bank from "../../models/Bank.model.js";
import Notification from "../../models/Notification.model.js";

export const addBank = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { bank_name, account_number, ifsc_code, upi_id } = req.body;
    const is_bank = await Bank.findOne({
      bank_name: bank_name,
      users: user_id,
    });
    if (!is_bank) {
      const banks = new Bank({
        bank_name,
        account_number,
        ifsc_code,
        upi_id,
        users: user_id,
      });
      const bank = await banks.save();
      if (bank) {
        const notification = new Notification({
          users: user_id,
          message: ` is Add a new Bank`,
        });
        await notification.save();
        return res.send({
          success: true,
          message: "Bank Add Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Some have problem",
        });
      }
    } else {
      return res.send({
        success: false,
        message: "Bank Already Add",
      });
    }
  } catch (errors) {
    return res.send({
      success: false,
      message: errors.message,
    });
  }
};
export const userGetBanks = async (req, res) => {
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
