import GoogleAds from "../../models/GoogleAds.model.js";

export const getGoogleAds = async (req, res) => {
  try {
    const ads = await GoogleAds.find({}).sort({ "_id": -1 });
    return res.status(200).json({
      success: true,
      ads: ads,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};

export const createGoogleAds = async (req, res) => {
  try {
    const { app_id, ad_unit_id } = req.body;
    const is_ads = await GoogleAds.findOne({ ad_unit_id });
    if (!is_ads) {
      const ads = new GoogleAds({
        app_id,
        ad_unit_id,
      });
      const result = await ads.save();
      if (result) {
        return res.send({
          success: true,
          message: "Ads Add Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Ads Add Failed",
        });
      }
    } else {
      return res.send({
        success: false,
        message: "this Already Add",
      });
    }
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};
export const editGoogleAds = async (req, res) => {
  try {
    const id = req.params.id;
    const ad = await GoogleAds.findById({ _id: id });
    return res.send({
      success: true,
      ad: ad,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updateGoogleAds = async (req, res) => {
  try {
    const id = req.params.id;
    const { app_id, ad_unit_id } = req.body;
    const ad = await GoogleAds.findByIdAndUpdate({ _id: id }, {
      app_id,
      ad_unit_id,
    });
    if (ad) {
      return res.send({
        success: true,
        message: "Ads update successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Ads not update successfully",
      });
    }
  } catch (err) {
    return res.send({
      success: true,
      message: err.message,
    });
  }
};
export const deleteGoogleAds = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await GoogleAds.findByIdAndDelete({ _id: id });
    if (result) {
      return res.send({
        success: true,
        message: "Ads Delete Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Ads Delete Failed",
      });
    }
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};
