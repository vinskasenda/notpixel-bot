import a4_0x17f5d3 from 'moment-timezone';
import a4_0x8953b8 from 'fs';
import a4_0x1ece72 from 'path';
import { parse } from 'querystring';
import a4_0x2432dd from './twist.js';
export class Helper {
  static ['delay'] = (_0x4a9ad5, _0xa23a1f, _0x2be515, _0x4d023d) => {
    return new Promise(_0x23573a => {
      let _0x266874 = _0x4a9ad5;
      if (_0xa23a1f != undefined) {
        a4_0x2432dd.log(_0x2be515, _0xa23a1f, _0x4d023d, "Delaying for " + this.msToTime(_0x4a9ad5));
      } else {
        a4_0x2432dd.info((_0x2be515 ?? '') + " - Delaying for " + this.msToTime(_0x4a9ad5));
      }
      const _0x1ab4df = setInterval(() => {
        _0x266874 -= 0x3e8;
        if (_0xa23a1f != undefined) {
          a4_0x2432dd.log(_0x2be515, _0xa23a1f, _0x4d023d, "Delaying for " + this.msToTime(_0x266874));
        } else {
          a4_0x2432dd.info((_0x2be515 ?? '') + " - Delaying for " + this.msToTime(_0x266874));
        }
        if (_0x266874 <= 0x0) {
          clearInterval(_0x1ab4df);
          _0x23573a();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x1ab4df);
        await a4_0x2432dd.clearInfo();
        if (_0xa23a1f) {
          a4_0x2432dd.log(_0x2be515, _0xa23a1f, _0x4d023d);
        }
        _0x23573a();
      }, _0x4a9ad5);
    });
  };
  static ["randomUserAgent"]() {
    const _0x3ec30f = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x3ec30f[Math.floor(Math.random() * _0x3ec30f.length)];
  }
  static ['readTime'](_0x38b704) {
    const _0x381a02 = a4_0x17f5d3.unix(_0x38b704);
    return _0x381a02.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x165596 = a4_0x17f5d3().tz('Asia/Singapore').unix();
    return _0x165596.toString();
  }
  static ["getSession"](_0x4637e6) {
    try {
      if (!a4_0x8953b8.existsSync("accounts")) {
        a4_0x8953b8.mkdirSync("accounts");
      }
      const _0xf492eb = a4_0x8953b8.readdirSync(a4_0x1ece72.resolve(_0x4637e6));
      const _0x35ad40 = [];
      _0xf492eb.forEach(_0x9b289 => {
        _0x35ad40.push(_0x9b289);
      });
      return _0x35ad40;
    } catch (_0x28740f) {
      throw Error("Error reading sessions directory: " + _0x28740f + ',');
    }
  }
  static ['resetAccounts']() {
    try {
      const _0x57e71b = a4_0x1ece72.resolve('accounts');
      const _0x5e1bea = a4_0x8953b8.readdirSync(_0x57e71b);
      console.log("Deleting Accounts...");
      _0x5e1bea.forEach(_0x1c5d73 => {
        const _0x4c3894 = a4_0x1ece72.join(_0x57e71b, _0x1c5d73);
        console.log(_0x4c3894);
        a4_0x8953b8.rm(_0x4c3894, {
          'recursive': true,
          'force': true
        }, _0x46ebc2 => {
          if (_0x46ebc2) {
            console.error("Error deleting file " + _0x4c3894 + ':', _0x46ebc2);
          }
        });
      });
      console.info("Account reset successfully. Please restart the bot.");
    } catch (_0x5b8372) {
      console.error("Error deleting accounts: " + _0x5b8372);
      throw _0x5b8372;
    }
  }
  static ["getTelegramQuery"](_0x23b224, _0x59003e) {
    const _0x35efcd = _0x23b224.indexOf('#');
    if (_0x35efcd === -0x1) {
      throw new Error("No query string found in the URL.");
    }
    const _0x5f2c0f = _0x23b224.substring(_0x35efcd + 0x1);
    const _0x5c6beb = _0x5f2c0f.split('&');
    const _0x5536e3 = _0x5c6beb[0x0].split('&')[0x0].replace("tgWebAppData=", '');
    if (!_0x5536e3) {
      throw new Error("Param not found in the query string.");
    }
    if (_0x59003e == '1') {
      return _0x5536e3;
    } else {
      if (_0x59003e == '2') {
        return this.decodeQueryString(_0x5536e3);
      } else {
        const _0x191336 = this.decodeQueryString(_0x5536e3);
        return this.jsonToInitParam(_0x191336);
      }
    }
  }
  static ['getQueryFromUrl'](_0x792108) {
    var _0x46754f = decodeURIComponent(iframeElement.src);
    var _0x592477 = _0x46754f.split('#')[0x1] || '';
    var _0x1d26bd = _0x592477.split('tgWebAppData=')[0x1] || '';
    var _0x4b4da4 = _0x1d26bd.split('&');
    var _0x2637f2 = {};
    _0x4b4da4.forEach(_0x594ab8 => {
      var [_0x2eaaa1, _0x4ab93f] = _0x594ab8.split('=');
      if (_0x2eaaa1 && _0x4ab93f) {
        _0x2637f2[_0x2eaaa1] = _0x4ab93f;
      }
    });
    var _0x5dee98 = Object.keys(_0x2637f2).filter(_0x210201 => !_0x210201.includes('tgWebApp')).map(_0x169843 => _0x169843 + '=' + _0x2637f2[_0x169843]).join('&');
    return _0x5dee98;
  }
  static ['jsonToInitParam'](_0x3b7682) {
    const _0x36eaf0 = parse(_0x3b7682);
    if (_0x36eaf0.user) {
      const _0x2074d3 = JSON.parse(_0x36eaf0.user);
      _0x36eaf0.user = encodeURIComponent(JSON.stringify(_0x2074d3));
    }
    const _0x1f192d = [];
    for (const [_0x51cf3a, _0x513c07] of Object.entries(_0x36eaf0)) {
      _0x1f192d.push(_0x51cf3a + '=' + _0x513c07);
    }
    const _0x9f6a17 = _0x1f192d.join('&');
    return _0x9f6a17;
  }
  static ['decodeQueryString'](_0x4cc409) {
    const _0x3ee3b7 = decodeURIComponent(_0x4cc409);
    const _0x33adce = _0x3ee3b7.split('&');
    const _0x1d0115 = {};
    _0x33adce.forEach(_0x4873aa => {
      const [_0x2ed336, _0x16e8a2] = _0x4873aa.split('=');
      if (_0x2ed336 === "user") {
        _0x1d0115[_0x2ed336] = JSON.parse(decodeURIComponent(_0x16e8a2));
      } else {
        _0x1d0115[_0x2ed336] = _0x16e8a2;
      }
    });
    const _0x263cda = [];
    for (const [_0x2be89b, _0x34ffc2] of Object.entries(_0x1d0115)) {
      if (_0x2be89b === "user") {
        _0x263cda.push(_0x2be89b + '=' + JSON.stringify(_0x34ffc2));
      } else {
        _0x263cda.push(_0x2be89b + '=' + _0x34ffc2);
      }
    }
    return _0x263cda.join('&');
  }
  static ['createDir'](_0x199f98) {
    try {
      const _0x4b0f34 = a4_0x1ece72.join("accounts", _0x199f98);
      if (!a4_0x8953b8.existsSync("accounts")) {
        a4_0x8953b8.mkdirSync("accounts");
      }
      a4_0x8953b8.mkdirSync(_0x4b0f34, {
        'recursive': true
      });
      console.log(_0x4b0f34);
      return _0x4b0f34;
    } catch (_0xdc8a83) {
      throw new Error("Error creating directory: " + _0xdc8a83);
    }
  }
  static ['saveQueryFile'](_0x5879c4, _0x3a8277) {
    const _0x14cbdc = a4_0x1ece72.resolve(_0x5879c4, "query.txt");
    a4_0x8953b8.writeFile(_0x14cbdc, _0x3a8277, "utf8", _0x12d69b => {
      if (_0x12d69b) {
        console.error("Error writing file:", _0x12d69b);
      } else {
        console.log("Query File Created/Modified Successfully.");
      }
    });
  }
  static ["random"](_0x391b72, _0x44e621) {
    const _0x12bf13 = Math.floor(Math.random() * (_0x44e621 - _0x391b72 + 0x1)) + _0x391b72;
    return _0x12bf13;
  }
  static ["randomArr"](_0x365ef2) {
    return _0x365ef2[Math.floor(Math.random() * _0x365ef2.length)];
  }
  static ["msToTime"](_0x4cb528) {
    const _0x2ea012 = Math.floor(_0x4cb528 / 3600000);
    const _0x2715e4 = _0x4cb528 % 3600000;
    const _0x174cf4 = Math.floor(_0x2715e4 / 60000);
    const _0x2b293d = _0x2715e4 % 60000;
    const _0x42477b = Math.round(_0x2b293d / 0x3e8);
    return _0x2ea012 + " Hours " + _0x174cf4 + " Minutes " + _0x42477b + " Seconds";
  }
  static ["queryToJSON"](_0x524389) {
    try {
      const _0x3df97f = {};
      const _0x161e2b = _0x524389.split('&');
      _0x161e2b.forEach(_0x3ba779 => {
        const [_0x1ac53a, _0x2c37ea] = _0x3ba779.split('=');
        if (_0x1ac53a === 'user') {
          _0x3df97f[_0x1ac53a] = JSON.parse(decodeURIComponent(_0x2c37ea));
        } else {
          _0x3df97f[_0x1ac53a] = decodeURIComponent(_0x2c37ea);
        }
      });
      return _0x3df97f;
    } catch (_0x16b8f1) {
      throw Error("Invalid Query");
    }
  }
  static ["generateRandomString"](_0x4ea015) {
    let _0x19cfdf = '';
    const _0x275246 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x5a0e64 = 0x0; _0x5a0e64 < _0x4ea015; _0x5a0e64++) {
      _0x19cfdf += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x275246));
    }
    return _0x19cfdf;
  }
  static ["readQueryFile"](_0x30e651) {
    try {
      const _0x3fe1de = a4_0x1ece72.resolve(_0x30e651);
      const _0x5a477f = a4_0x8953b8.readFileSync(_0x3fe1de, 'utf8');
      return _0x5a477f;
    } catch (_0x563ba1) {
      console.log("No query.txt Files Found");
    }
  }
  static ["launchParamToQuery"](_0x4d5542) {
    const _0x3ea410 = new URLSearchParams(_0x4d5542);
    let _0x229892 = decodeURIComponent(_0x3ea410.get("tgWebAppData"));
    const _0x15b83e = new URLSearchParams(_0x229892);
    let _0x333531 = decodeURIComponent(_0x15b83e.get("user"));
    let _0x1dc3e7 = JSON.parse(_0x333531);
    const _0x2939e5 = {
      'query_id': _0x15b83e.get('query_id'),
      'user': _0x1dc3e7,
      'auth_date': _0x15b83e.get("auth_date"),
      'hash': _0x15b83e.get("hash")
    };
    const _0x14d629 = JSON.stringify(_0x2939e5.user);
    const _0x496014 = encodeURIComponent(_0x14d629);
    let _0x21725a = '';
    if (_0x2939e5.query_id) {
      _0x21725a += 'query_id=' + encodeURIComponent(_0x2939e5.query_id) + '&';
    }
    _0x21725a += "user=" + _0x496014 + "&auth_date=" + encodeURIComponent(_0x2939e5.auth_date) + "&hash=" + encodeURIComponent(_0x2939e5.hash);
    return _0x21725a;
  }
  static ['showSkelLogo']() {
    console.log("INSIDERS");
  }
}