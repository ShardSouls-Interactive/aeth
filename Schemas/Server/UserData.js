const { Schema, model } = require("mongoose");

const userData = new Schema({
  userId: { 
    type: String, 
    required: true 
  },
  guildId: { 
    type: String, 
    required: true 
  },
  birthday: { 
    type: Date,
    default: Date.now
  },
  language: { 
    type: String,
    default: "pt-br"
  },
  strikes: { 
    type: Number, 
    default: 0
  },
  lastWarn: { 
    type: Date,
    default: Date.now 
  }
});

module.exports = model("UserData", userData);