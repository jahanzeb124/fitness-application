var mongoose = require("mongoose");

var schema = mongoose.Schema;

var workoutSchema = new schema({
  // image:{
  //     type: []
  // },
  imgpath: {
    type: String,
  },
  title: {
    type: String,
  },
  exname: {
    type: [],
  },
  videoid: {
    type: [],
  },

  info: {
    type: [],
  },
});

module.exports = mongoose.model("workout", workoutSchema);
