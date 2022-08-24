import Report from "../../models/Report.model.js";

export const getReport = async (req, res) => {
  try {
    const users = req.user_id;
    const reports = await Report.findOne({ users });
    return res.send({
      success: true,
      reports: reports,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

export const emptyTodayEarn = async (req, res) => {
  try {
    const users = req.user_id;
    const reports = await Report.findOne({ users });
    reports.today_coin_earned = 0;
    await reports.save();
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};
