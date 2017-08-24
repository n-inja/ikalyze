"use strict"
const sheet = require("./sheet.js");
const ika = require("./fetchData.js");
const tweet = require("./tweet.js");

ika((data) => {
  let cnt = 2;
  const diff = {
    weapon: {},
    rule: {}
  };
  const cb = () => {
    let str = "本日の記録\n";
    let b = false;
    Object.keys(diff.rule).forEach(key => {
      if(diff.rule[key].win > 0) {
        str += `${key}\nsum(rate) : ${diff.rule[key].win + diff.rule[key].lose}(${Math.floor(100*diff.rule[key].win / (diff.rule[key].win + diff.rule[key].lose))/100})\n`;
        b = true;
      }
    });
    if(b) {
      tweet(str, () => {console.log("tweet")});
    }
    let str2 = "本日の記録\n";
    let b2 = false;
    Object.keys(diff.weapon).forEach(key => {
      if(diff.weapon[key].win > 0) {
        str2 += `${key}\nsum(rate) : ${diff.weapon[key].win + diff.weapon[key].lose}(${Math.floor(100*diff.weapon[key].win / (diff.weapon[key].win + diff.weapon[key].lose))/100})\n`;
        b2 = true;
      }
    });
    console.log(str2);
    if(b2) {
      tweet(str2, () => {console.log("tweet")});
    }
  };
  sheet.weapon(data.weapon, (weaponDiff) => {
    diff.weapon = weaponDiff;
    cnt--;
    if(cnt === 0) {
      cb();
    }
  });
  sheet.rule(data.rule, (ruleDiff) => {
    diff.rule = ruleDiff;
    cnt--;
    if(cnt === 0) {
      cb();
    }
  });
});
