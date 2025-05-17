const { Schema } = require("mongoose");

const StoreSchema = new Schema({
  id: { type: String, required: true },
  item: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Boolean, required: true },
});

module.exports = StoreSchema;