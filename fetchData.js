"use strict"

const request = require("request");
const cookie = request.cookie("iksm_session=IKSM_SESSION");
const url = "https://app.splatoon2.nintendo.net/api/records";

const j = request.jar();
j.setCookie(cookie, url);

const getData = (cb) => {
  request({
    url: url,
    jar: j,
    json: true
  }, (err, res, body) => {
    const ans = {
      rule: {
        nawabari: {
          name: "nawabari",
          win: body.records.win_count,
          lose: body.records.lose_count
        },
        area: {
          name: "area",
          win: 0,
          lose: 0
        },
        yagura: {
          name: "yagura",
          win: 0,
          lose: 0
        },
        hoko: {
          name: "hoko",
          win: 0,
          lose: 0
        }
      },
      weapon: {

      }
    };
    Object.keys(body.records.stage_stats).forEach(key => {
      ans.rule.nawabari.win -= body.records.stage_stats[key].area_win;
      ans.rule.nawabari.win -= body.records.stage_stats[key].yagura_win;
      ans.rule.nawabari.win -= body.records.stage_stats[key].hoko_win;
      ans.rule.nawabari.lose -= body.records.stage_stats[key].area_lose;
      ans.rule.nawabari.lose -= body.records.stage_stats[key].yagura_lose;
      ans.rule.nawabari.lose -= body.records.stage_stats[key].hoko_lose;
      ans.rule.area.win += body.records.stage_stats[key].area_win;
      ans.rule.yagura.win += body.records.stage_stats[key].yagura_win;
      ans.rule.hoko.win += body.records.stage_stats[key].hoko_win;
      ans.rule.area.lose += body.records.stage_stats[key].area_lose;
      ans.rule.yagura.lose += body.records.stage_stats[key].yagura_lose;
      ans.rule.hoko.lose += body.records.stage_stats[key].hoko_lose;
    });
    Object.keys(body.records.weapon_stats).forEach(key => {
      ans.weapon[body.records.weapon_stats[key].weapon.name] = {
        name: body.records.weapon_stats[key].weapon.name,
        win: body.records.weapon_stats[key].win_count,
        lose: body.records.weapon_stats[key].lose_count
      }
    });
    cb(ans);
  });
};

module.exports = getData;
