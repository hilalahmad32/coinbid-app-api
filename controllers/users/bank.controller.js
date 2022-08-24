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
    const users = req.user_id;
    const banks = await Bank.find({ users: users }).populate("users");
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

export const userEditBanks = async (req, res) => {
  try {
    const _id = req.params.id;
    const banks = await Bank.findById({ _id }).populate("users");
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
export const userUpdateBanks = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { bank_name, account_number, ifsc_code, upi_id } = req.body;
    const bank1 = await Bank.updateOne({ users: user_id }, {
      $set: {
        bank_name,
        account_number,
        ifsc_code,
        upi_id,
      },
    });
    // bank1.bank_name = bank_name;
    // bank1.account_number = account_number;
    // bank1.ifsc_code = ifsc_code;
    // bank1.upi_id = upi_id;
    // const banks = await bank1.save();
    if (bank1) {
      return res.send({
        success: true,
        message: "Bank Update Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some have problem",
      });
    }
  } catch (errors) {
    return res.send({
      success: false,
      message: errors.message,
    });
  }
};
export const userDeleteBanks = async (req, res) => {
  try {
    const _id = req.params.id;
    const banks = await Bank.findByIdAndDelete({ _id });
    res.send({
      success: true,
      message: "Bank Delete Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
