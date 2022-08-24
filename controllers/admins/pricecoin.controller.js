import PriceCoin from "../../models/PriceCoin.model.js";

export const getPriceCoin = async (req, res) => {
  try {
    const totalCount = await PriceCoin.count();
    if (totalCount != 1) {
      const prices = new PriceCoin({
        coins: "10",
        price: "4",
      });
      await prices.save();
    } else {
      const pircecoins = await PriceCoin.find();
      return res.send({
        success: true,
        coins: pircecoins,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export const updatePriceCoins = async (req, res) => {
  try {
    const id = req.params.id;
    const { coins, price } = req.body;
    const priceCoins = await PriceCoin.findByIdAndUpdate({ _id: id }, {
      coins,
      price,
    });
    if (priceCoins) {
      return res.send({
        success: true,
        message: "Coin Price update Successfully",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
