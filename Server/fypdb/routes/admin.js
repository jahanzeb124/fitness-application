var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var passport = require("passport");
var authenticate = require("../authenticate");
var Trainer = require("../models/trainer");
var User = require("../models/user");
const Workout = require("../models/workout");
router.use(bodyParser.json());
var setpermission = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/addtrainer", setpermission, function (req, res, next) {
  console.log(req.body.img);
  Trainer.create(req.body)
    .then(
      (trainer) => {
        console.log("Trainer has been Added ", trainer);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(trainer);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.get("/viewtrainers", setpermission, function (req, res, next) {
  Trainer.find()
    .sort("name")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});

router.delete(
  "/deltrainer/:trainername",
  setpermission,
  function (req, res, next) {
    console.log(req.params.trainername);
    Trainer.deleteOne(
      { name: req.params.trainername },
      function (error, results) {
        if (error) {
          return next(error);
        }
        // Respond with valid data
        res.json(results);
      }
    );
  }
);

router.put("/banuser", setpermission, function (req, res, next) {
  console.log(req.body.email);
  User.updateOne(
    { email: req.body.email },
    { $set: { ban: true } },
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

////Workouts/////

router.post("/addworkout", setpermission, function (req, res, next) {
  Workout.create(req.body)
    .then(
      (workout) => {
        console.log("Workout has been Added ", workout);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(workout);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.get("/viewworkout", setpermission, function (req, res, next) {
  Workout.find()
    .sort("name")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});

router.delete("/delworkout", setpermission, function (req, res, next) {
  console.log(req.body.id);
  Workout.deleteOne({ _id: req.body.id }, function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});

module.exports = router;
