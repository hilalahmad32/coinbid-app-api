import Report from "../../models/Report.model.js";

export const getReport = async (req, res) => {
  try {
    const users = req.user_id;
    const reports = await Report.findOne({ users }).populate("packages");
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
    const data=await reports.save();
    if(data){
      return res.send({
        success:true,
        data:data
      })
    }else{
      return res.send({
        success:false,
        data:"some problem"
      })
    }

  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};
