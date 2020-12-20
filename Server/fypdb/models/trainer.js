var mongoose = require("mongoose");

var schema = mongoose.Schema;

var trainerSchema = new schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: String,
  },
  exp: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("trainer", trainerSchema);
