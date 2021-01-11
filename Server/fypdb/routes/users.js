var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var passport = require("passport");
var authenticate = require("../authenticate");
var ps = require("python-shell");
const Users = require("../models/user");

const xlsxFile = require("read-excel-file/node");
const { count } = require("../models/user");

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

router.post("/getcalories", function (req, res, next) {
  var fruit = req.body.data;

  console.log(fruit);
  xlsxFile("./Data.xlsx").then((rows) => {
    var response = "";
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][0]).toUpperCase().includes(fruit.toUpperCase())) {
        // console.log("Matched");
        // console.log("Calories:", rows[i][1]);
        // console.log("Poteins:", rows[i][14]);
        response = {
          name: String(rows[i][0]),
          quantity: String(rows[i][1]),
          calories: String(rows[i][2]),
          proteins: String(rows[i][15]),
        };
        res.status(200).send(response);
        break;
      }
    }
    if (response == "") res.status(404).send("not found");
  });
});

router.post("/getmeals", function (req, res, next) {
  xlsxFile("./classified.xlsx").then((rows) => {
    let i = 1;
    let find = req.body.data;
    let data = [];
    let content = [];
    rows.map((single) => {
      if (single[10] === find) {
        data.push(single);
      }
    });
    res.status(200).send(data);
  });
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
    Admin: req.user.admin,
  });
});

router.get("/viewusers", setpermission, function (req, res, next) {
  Users.find()
    .sort("username")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});

router.delete("/deluser/:username", setpermission, function (req, res, next) {
  console.log(req.params.username);
  Users.deleteOne({ username: req.params.username }, function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});

router.put("/updateuser", setpermission, function (req, res, next) {
  console.log(req.body);
  Users.findOneAndUpdate(
    { username: req.body.old },
    { username: req.body.new },
    function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    }
  );
});

router.put("/addworkout", setpermission, function (req, res, next) {
  Users.updateOne(
    { _id: req.body.id },
    { $addToSet: { exercise: req.body.ex } },
    function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
      console.log(results);
    }
  );
});
router.put("/addwater", setpermission, function (req, res, next) {
  Users.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { water: req.body.water } },
    { rawResult: true, new: true },
    function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
      console.log(results);
    }
  );
});
router.put("/updatepass", setpermission, function (req, res, next) {
  // Init Variables
  var passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.new) {
      Users.findById(req.user._id, function (err, user) {
        if (!err && user) {
          if (user.authenticate(passwordDetails.old)) {
            if (passwordDetails.new === passwordDetails.verify) {
              user.password = passwordDetails.new;

              user.save(function (err) {
                if (err) {
                  return res.status(422).send({
                    message: errorHandler.getErrorMessage(err),
                  });
                } else {
                  req.login(user, function (err) {
                    if (err) {
                      res.status(400).send(err);
                    } else {
                      res.send({
                        message: "Password changed successfully",
                      });
                    }
                  });
                }
              });
            } else {
              res.status(422).send({
                message: "Passwords do not match",
              });
            }
          } else {
            res.status(422).send({
              message: "Current password is incorrect",
            });
          }
        } else {
          res.status(400).send({
            message: "User is not found",
          });
        }
      });
    } else {
      res.status(422).send({
        message: "Please provide a new password",
      });
    }
  } else {
    res.status(401).send({
      message: "User is not signed in",
    });
  }
});

module.exports = router;
