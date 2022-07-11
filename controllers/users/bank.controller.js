import Bank from "../../models/Bank.model.js";

export const addBank = async (req, res) => {
  try {
    const user_id = req.user_idid;
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

    const banks = new Bank({});
  } catch (errors) {
    return res.send({
      success: false,
      message: errors.message,
    });
  }
};
