"use strict"

const twitter = require("twitter");

const client = new twitter({
  consumer_key: "CONSUMER_KEY",
  consumer_secret: "CONSUMER_SECRET",
  access_token_key: "ACCESS_TOKEN_KEY",
  access_token_secret: "ACCESS_TOKEN_SECRET"
});

const Tweet = (str, cb) => {
  if (!str) {
    console.log("nothing");
    return;
  }
  client.post("statuses/update", {
    status: str
  }, (err, tweet, res) => {
    if (err) {
      console.log(err);
    }
    cb();
  });
};

module.exports = Tweet;
