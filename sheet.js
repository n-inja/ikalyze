"use strict"

const GoogleSpreadSheet = require("google-spreadsheet");

const ruleSheet = new GoogleSpreadSheet("SPREADSHEETID");
const weaponSheet = new GoogleSpreadSheet("SPREADSHEETID");
const credentials = require("./APPNAME-HASH.json");

const ruleComp = (obj, cb) => {
  let prv = {};
  Object.keys(obj).forEach(key => {
    prv[key] = {};
  });
  let ans = {};
  ruleSheet.useServiceAccountAuth(credentials, (err) => {
    ruleSheet.getInfo((err, data) => {
      for (let i in data.worksheets) {
        if (data.worksheets[i].title === "シート1") {
          data.worksheets[i].getRows((err, rows) => {
            for (let j in rows) {
              prv[rows[j].name] = {
                name: rows[j].name,
                win: rows[j].win,
                lose: rows[j].lose
              }
            }
            data.worksheets[i].resize({
              rowCount: 1,
              colCount: 3
            }, (err) => {
              if (err) {
                console.log(err);
                return;
              }
              let cnt = Object.keys(obj).length;
              Object.keys(obj).forEach(function(key) {
                ans[key] = {
                  name: obj[key].name,
                  win: (obj[key].win | 0) - (prv[key].win | 0),
                  lose: (obj[key].lose | 0) - (prv[key].lose | 0)
                };
                data.worksheets[i].addRow(obj[key], function(err, row) {
                  cnt--;
                  if (err) {
                    console.log(err);
                    return;
                  }
                  if (cnt === 0) {
                    cb(ans);
                  }
                });
              });
            });
          });
        }
      }
    });
  });
};

const weaponComp = (obj, cb) => {
  let prv = {};
  Object.keys(obj).forEach(key => {
    prv[key] = {};
  });
  let ans = {};
  weaponSheet.useServiceAccountAuth(credentials, (err) => {
    weaponSheet.getInfo((err, data) => {
      for (let i in data.worksheets) {
        if (data.worksheets[i].title === "シート1") {
          data.worksheets[i].getRows((err, rows) => {
            for (let j in rows) {
              prv[rows[j].name] = {
                name: rows[j].name,
                win: rows[j].win,
                lose: rows[j].lose
              }
            }
            data.worksheets[i].resize({
              rowCount: 1,
              colCount: 3
            }, (err) => {
              if (err) {
                console.log(err);
                return;
              }
              let cnt = Object.keys(obj).length;
              Object.keys(obj).forEach(function(key) {
                ans[key] = {
                  name: obj[key].name,
                  win: (obj[key].win | 0) - (prv[key].win | 0),
                  lose: (obj[key].lose | 0) - (prv[key].lose | 0)
                };
                data.worksheets[i].addRow(obj[key], function(err, row) {
                  cnt--;
                  if (err) {
                    console.log(err);
                    return;
                  }
                  if (cnt === 0) {
                    cb(ans);
                  }
                });
              });
            });
          });
        }
      }
    });
  });
};

module.exports = {
  rule: ruleComp,
  weapon: weaponComp
}
