var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var passport = require("passport");
var authenticate = require("../authenticate");
var ps = require("python-shell");
const Users = require("../models/user");

router.use(bodyParser.json());

var setpermission = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/Signup", (req, res, next) => {
  try {
    Users.register(
      new Users({
        username: req.body.username,
        email: req.body.email,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              User: req.body,
              success: true,
              status: "Registration Successful!",
            });
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/adduser", setpermission, function (req, res, next) {
  User.create(req.body)
    .then(
      (user) => {
        console.log("User has been Added ", user);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.body);
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
    User: req.user,
  });
});

router.get("/viewusers", setpermission, function (req, res, next) {
  User.find()
    .sort("name")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});

module.exports = router;
