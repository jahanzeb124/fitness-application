var admin = require("firebase-admin");
var mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var CronJob = require("cron").CronJob;

var serviceAccount = require("./health-fit-assistant-firebase-adminsdk-tu0v0-228d8200e9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://health-fit-assistant.firebaseio.com",
});

var registrationToken =
  "dB8PzgtETLi0Mbi0bBoYv_:APA91bGZdleMDRTyQscNTMv6vvEwBYtyCqEVZcUOF6CNrMLcfKbvQEnfKWCeU3XLII1kC3p7zHwLdFxoZWZTw8DrwevMXxlLPKdo-7D6fcY1c3Pw03o75n7Wr6xIEDtrBPhMFOIxUCM0";

var message = {
  notification: {
    title: "Drink up",

    body: "",
  },
  android: {
    notification: {
      icon: "stock_ticker_update",
      color: "#7e55c3",
    },
  },

  token: registrationToken,
};

MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("fypdb");

    var dispatched = false;
    var amount = 0;
    var job = new CronJob(
      "*/10 * * * * *",
      function () {
        console.log("You will see this message every 10 sec");
        var cd = new Date();
        // if(cd.getHours===11){
        //   dbo.collection("users").findOneAndUpdate({water:{taken:""}},{})
        // }
        dbo
          .collection("users")
          .find({})
          .toArray(function (err, result) {
            if (err) throw err;
            result.map((single) => {
              if (typeof single.water === "undefined") {
                console.log("property doesnt exist");
              } else {
                var d = new Date();
                console.log(d.getMinutes());
                amount = Math.abs(
                  parseInt(single.water.taken) - parseInt(single.water.target)
                );
                if (d.getMinutes() === 21 && !dispatched && amount > 0) {
                  console.log("dispatched");

                  message.notification.body = `You have ${amount} glass left to drink`;
                  admin
                    .messaging()
                    .send(message)
                    .then((response) => {
                      // Response is a message ID string.
                      console.log("Successfully sent message:", response);
                      dispatched = true;
                    })
                    .catch((error) => {
                      console.log("Error sending message:", error);
                    });
                } else if (d.getMinutes() === 0 && dispatched) {
                  dispatched = false;
                }
              }
            });
          });
      },
      null,
      true,
      "America/Los_Angeles"
    );

    job.start();
  }
);
