import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
  taxs: {
    type: Number,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const Tax = mongoose.model("Tax", taxSchema);
export default Tax;
