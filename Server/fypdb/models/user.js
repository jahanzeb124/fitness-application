var mongoose = require("mongoose");

var schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new schema({
  email: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
