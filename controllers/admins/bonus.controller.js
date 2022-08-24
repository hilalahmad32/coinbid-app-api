import BounesCoin from "../../models/Bounes.model.js";

export const getBounesCoin = async (req, res) => {
  try {
    const coins = await BounesCoin.find({});
    const count = await BounesCoin.count();
    if (count > 0) {
      return res.send({
        success: true,
        coins: coins,
      });
    } else {
      const coins = 10;
      const coin = new BounesCoin({ coins });
      await coin.save();
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const addBounesCoin = async (req, res) => {
  try {
    const { coins } = req.body;
    const coin = new BounesCoin({ coins });
    const result = await coin.save();
    if (result) {
      return res.send({
        success: true,
        message: "Add Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some problem",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const editBounesCoin = async (req, res) => {
  try {
    const coins = await BounesCoin.findById({ _id: req.params.id });
    return res.send({
      success: true,
      coins: coins,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updateBounesCoin = async (req, res) => {
  try {
    const { coins } = req.body;
    const id = req.params.id;
    const result = await BounesCoin.findByIdAndUpdate({ _id: id }, {
      coins: coins,
    });
    if (result) {
      return res.send({
        success: true,
        message: "update Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some problem",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBounesCoin = async (req, res) => {
  try {
    const coins = await BounesCoin.findByIdAndDelete({ _id: req.params.id });
    if (coins) {
      return res.send({
        success: true,
        message: "update Successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "Some problem",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
