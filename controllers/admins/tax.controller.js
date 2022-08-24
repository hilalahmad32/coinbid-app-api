import Tax from "../../models/Tax.model.js";

export const getTax = async (req, res) => {
  try {
    const taxs = await Tax.find({});
    return res.send({
      success: true,
      taxs: taxs,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};

export const addTax = async (req, res) => {
  const taxs = new Tax({
    taxs: 20,
  });
  await taxs.save();
};

export const editTax = async (req, res) => {
  try {
    const id = req.params.id;
    const tax = await Tax.findById({ _id: id });
    return res.send({
      success: true,
      tax: tax,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};

export const updateTax = async (req, res) => {
  try {
    const id = req.params.id;
    const { taxs } = req.body;
    const tax = await Tax.findByIdAndUpdate({ _id: id }, {
      taxs: taxs,
    });
    if (tax) {
      return res.send({
        success: true,
        message: "Tax Update successfully",
      });
    }
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};
