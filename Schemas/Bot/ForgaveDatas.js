const { Schema, model } = require("mongoose");

const ForgaveSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  guildName: {
    type: String,
  },
  userName: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  forgave: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("ForgaveData", ForgaveSchema);