import a4_0xd12478 from 'moment-timezone';
import a4_0x3bdd55 from 'fs';
import a4_0x24b6c0 from 'path';
import { parse } from 'querystring';
import a4_0x16e11c from './twist.js';
export class Helper {
  static ["delay"] = (_0x1a7ba8, _0x10a164, _0x4dfed5, _0xa1067) => {
    return new Promise(_0x15e6bc => {
      let _0xb53222 = _0x1a7ba8;
      if (_0x10a164 != undefined) {
        a4_0x16e11c.log(_0x4dfed5, _0x10a164, _0xa1067, "Delaying for " + this.msToTime(_0x1a7ba8));
      } else {
        a4_0x16e11c.info((_0x4dfed5 ?? '') + " - Delaying for " + this.msToTime(_0x1a7ba8));
      }
      const _0x26611d = setInterval(() => {
        _0xb53222 -= 0x3e8;
        if (_0x10a164 != undefined) {
          a4_0x16e11c.log(_0x4dfed5, _0x10a164, _0xa1067, "Delaying for " + this.msToTime(_0xb53222));
        } else {
          a4_0x16e11c.info((_0x4dfed5 ?? '') + " - Delaying for " + this.msToTime(_0xb53222));
        }
        if (_0xb53222 <= 0x0) {
          clearInterval(_0x26611d);
          _0x15e6bc();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x26611d);
        await a4_0x16e11c.clearInfo();
        if (_0x10a164) {
          a4_0x16e11c.log(_0x4dfed5, _0x10a164, _0xa1067);
        }
        _0x15e6bc();
      }, _0x1a7ba8);
    });
  };
  static ["randomUserAgent"]() {
    const _0x5d52af = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x5d52af[Math.floor(Math.random() * _0x5d52af.length)];
  }
  static ["readTime"](_0x34f2c8) {
    const _0x16fc49 = a4_0xd12478.unix(_0x34f2c8);
    return _0x16fc49.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x5ee280 = a4_0xd12478().tz('Asia/Singapore').unix();
    return _0x5ee280.toString();
  }
  static ["getSession"](_0xcc334e) {
    try {
      if (!a4_0x3bdd55.existsSync("accounts")) {
        a4_0x3bdd55.mkdirSync("accounts");
      }
      const _0x503146 = a4_0x3bdd55.readdirSync(a4_0x24b6c0.resolve(_0xcc334e));
      const _0x4de3e8 = [];
      _0x503146.forEach(_0x4c1754 => {
        _0x4de3e8.push(_0x4c1754);
      });
      return _0x4de3e8;
    } catch (_0x26a8c1) {
      throw Error("Error reading sessions directory: " + _0x26a8c1 + ',');
    }
  }
  static ["resetAccounts"]() {
    try {
      const _0x4a3c6f = a4_0x24b6c0.resolve("accounts");
      const _0x4f2cc1 = a4_0x3bdd55.readdirSync(_0x4a3c6f);
      console.log("Deleting Accounts...");
      _0x4f2cc1.forEach(_0x2b7964 => {
        const _0x1c5140 = a4_0x24b6c0.join(_0x4a3c6f, _0x2b7964);
        console.log(_0x1c5140);
        a4_0x3bdd55.rm(_0x1c5140, {
          'recursive': true,
          'force': true
        }, _0x33f839 => {
          if (_0x33f839) {
            console.error("Error deleting file " + _0x1c5140 + ':', _0x33f839);
          }
        });
      });
      console.info("Account reset successfully. Please restart the bot.");
    } catch (_0x3caac8) {
      console.error("Error deleting accounts: " + _0x3caac8);
      throw _0x3caac8;
    }
  }
  static ["getTelegramQuery"](_0x125d81, _0x163ed5) {
    const _0x2810ef = _0x125d81.indexOf('#');
    if (_0x2810ef === -0x1) {
      throw new Error("No query string found in the URL.");
    }
    const _0x4faf9f = _0x125d81.substring(_0x2810ef + 0x1);
    const _0x444365 = _0x4faf9f.split('&');
    const _0x3dd88e = _0x444365[0x0].split('&')[0x0].replace("tgWebAppData=", '');
    if (!_0x3dd88e) {
      throw new Error("Param not found in the query string.");
    }
    if (_0x163ed5 == '1') {
      return _0x3dd88e;
    } else {
      if (_0x163ed5 == '2') {
        return this.decodeQueryString(_0x3dd88e);
      } else {
        const _0x21dac2 = this.decodeQueryString(_0x3dd88e);
        return this.jsonToInitParam(_0x21dac2);
      }
    }
  }
  static ['getQueryFromUrl'](_0x45d5df) {
    var _0x55f096 = decodeURIComponent(iframeElement.src);
    var _0x4195b6 = _0x55f096.split('#')[0x1] || '';
    var _0x122c74 = _0x4195b6.split("tgWebAppData=")[0x1] || '';
    var _0x1b6810 = _0x122c74.split('&');
    var _0x3451d4 = {};
    _0x1b6810.forEach(_0x1f3262 => {
      var [_0x416bcf, _0xc85bd0] = _0x1f3262.split('=');
      if (_0x416bcf && _0xc85bd0) {
        _0x3451d4[_0x416bcf] = _0xc85bd0;
      }
    });
    var _0x4c2175 = Object.keys(_0x3451d4).filter(_0x51896b => !_0x51896b.includes('tgWebApp')).map(_0x3ddf80 => _0x3ddf80 + '=' + _0x3451d4[_0x3ddf80]).join('&');
    return _0x4c2175;
  }
  static ["jsonToInitParam"](_0x38258d) {
    const _0x36c35d = parse(_0x38258d);
    if (_0x36c35d.user) {
      const _0xa05d01 = JSON.parse(_0x36c35d.user);
      _0x36c35d.user = encodeURIComponent(JSON.stringify(_0xa05d01));
    }
    const _0xab8789 = [];
    for (const [_0x5373a4, _0xc34975] of Object.entries(_0x36c35d)) {
      _0xab8789.push(_0x5373a4 + '=' + _0xc34975);
    }
    const _0x5d724 = _0xab8789.join('&');
    return _0x5d724;
  }
  static ["decodeQueryString"](_0x1e53c4) {
    const _0x42fed3 = decodeURIComponent(_0x1e53c4);
    const _0x584b7d = _0x42fed3.split('&');
    const _0x5f1419 = {};
    _0x584b7d.forEach(_0x5ba97a => {
      const [_0x441a03, _0x24f7ed] = _0x5ba97a.split('=');
      if (_0x441a03 === "user") {
        _0x5f1419[_0x441a03] = JSON.parse(decodeURIComponent(_0x24f7ed));
      } else {
        _0x5f1419[_0x441a03] = _0x24f7ed;
      }
    });
    const _0x200771 = [];
    for (const [_0x49ae8f, _0x4ce1ba] of Object.entries(_0x5f1419)) {
      if (_0x49ae8f === "user") {
        _0x200771.push(_0x49ae8f + '=' + JSON.stringify(_0x4ce1ba));
      } else {
        _0x200771.push(_0x49ae8f + '=' + _0x4ce1ba);
      }
    }
    return _0x200771.join('&');
  }
  static ["createDir"](_0x158d1e) {
    try {
      const _0x3061ab = a4_0x24b6c0.join("accounts", _0x158d1e);
      if (!a4_0x3bdd55.existsSync("accounts")) {
        a4_0x3bdd55.mkdirSync("accounts");
      }
      a4_0x3bdd55.mkdirSync(_0x3061ab, {
        'recursive': true
      });
      console.log(_0x3061ab);
      return _0x3061ab;
    } catch (_0x9f27ab) {
      throw new Error("Error creating directory: " + _0x9f27ab);
    }
  }
  static ["saveQueryFile"](_0x1a6fa7, _0x12725a) {
    const _0x3263b0 = a4_0x24b6c0.resolve(_0x1a6fa7, 'query.txt');
    a4_0x3bdd55.writeFile(_0x3263b0, _0x12725a, "utf8", _0x19b89c => {
      if (_0x19b89c) {
        console.error("Error writing file:", _0x19b89c);
      } else {
        console.log("Query File Created/Modified Successfully.");
      }
    });
  }
  static ["random"](_0x171a01, _0xdadf2d) {
    const _0x1061c2 = Math.floor(Math.random() * (_0xdadf2d - _0x171a01 + 0x1)) + _0x171a01;
    return _0x1061c2;
  }
  static ["randomArr"](_0x265db2) {
    return _0x265db2[Math.floor(Math.random() * _0x265db2.length)];
  }
  static ["msToTime"](_0x2a605d) {
    const _0x47c1f4 = Math.floor(_0x2a605d / 3600000);
    const _0x3bee77 = _0x2a605d % 3600000;
    const _0x47809f = Math.floor(_0x3bee77 / 60000);
    const _0x19e01e = _0x3bee77 % 60000;
    const _0x29bd10 = Math.round(_0x19e01e / 0x3e8);
    return _0x47c1f4 + " Hours " + _0x47809f + " Minutes " + _0x29bd10 + " Seconds";
  }
  static ["queryToJSON"](_0x229d7f) {
    try {
      const _0x1208b3 = {};
      const _0x10de62 = _0x229d7f.split('&');
      _0x10de62.forEach(_0x3ea800 => {
        const [_0x2eedc9, _0x5c8d05] = _0x3ea800.split('=');
        if (_0x2eedc9 === "user") {
          _0x1208b3[_0x2eedc9] = JSON.parse(decodeURIComponent(_0x5c8d05));
        } else {
          _0x1208b3[_0x2eedc9] = decodeURIComponent(_0x5c8d05);
        }
      });
      return _0x1208b3;
    } catch (_0x51436b) {
      throw Error("Invalid Query");
    }
  }
  static ["generateRandomString"](_0x571864) {
    let _0x1c860c = '';
    const _0x397f91 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x3b297f = 0x0; _0x3b297f < _0x571864; _0x3b297f++) {
      _0x1c860c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x397f91));
    }
    return _0x1c860c;
  }
  static ["readQueryFile"](_0x519cec) {
    try {
      const _0x5a2cb8 = a4_0x24b6c0.resolve(_0x519cec);
      const _0x377421 = a4_0x3bdd55.readFileSync(_0x5a2cb8, 'utf8');
      return _0x377421;
    } catch (_0x110290) {
      console.log("No query.txt Files Found");
    }
  }
  static ["launchParamToQuery"](_0x4dfef7) {
    const _0x4e2d19 = new URLSearchParams(_0x4dfef7);
    let _0x1a81a3 = decodeURIComponent(_0x4e2d19.get('tgWebAppData'));
    const _0x3756e7 = new URLSearchParams(_0x1a81a3);
    let _0x5e5e87 = decodeURIComponent(_0x3756e7.get("user"));
    let _0x37a99d = JSON.parse(_0x5e5e87);
    const _0x250e3f = {
      'query_id': _0x3756e7.get("query_id"),
      'user': _0x37a99d,
      'auth_date': _0x3756e7.get("auth_date"),
      'hash': _0x3756e7.get("hash")
    };
    const _0x244c79 = JSON.stringify(_0x250e3f.user);
    const _0x5d39a1 = encodeURIComponent(_0x244c79);
    let _0x2f8eb0 = '';
    if (_0x250e3f.query_id) {
      _0x2f8eb0 += 'query_id=' + encodeURIComponent(_0x250e3f.query_id) + '&';
    }
    _0x2f8eb0 += "user=" + _0x5d39a1 + "&auth_date=" + encodeURIComponent(_0x250e3f.auth_date) + "&hash=" + encodeURIComponent(_0x250e3f.hash);
    return _0x2f8eb0;
  }
  static ['showSkelLogo']() {
    console.log("INSIDERS");
  }
}
