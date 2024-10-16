import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import { Core } from './src/core/core.js';
import { Telegram } from './src/core/telegram.js';
import { Helper } from './src/utils/helper.js';
import a0_0x181001 from './src/utils/logger.js';
import a0_0x375d88 from './src/utils/twist.js';
async function operation(_0x7206ff, _0x3acd21, _0x59ae82, _0x51f8a7) {
  try {
    const _0x340d14 = new Core(_0x7206ff, _0x3acd21, _0x59ae82, _0x51f8a7);
    const _0x158c1c = Helper.random(0x0, 0x7530);
    await Helper.delay(_0x158c1c, _0x7206ff, "Random Delay " + Helper.msToTime(_0x158c1c) + ", To Make Sure All Account Not Draw On Same pixel...", _0x340d14);
    const _0x469b33 = Config.REPAINTER ?? true;
    await _0x340d14.getMiningStatus(true);
    await _0x340d14.checkUserSelectedTemplate();
    while (_0x340d14.mining.charges != 0x0) {
      if (_0x469b33 == true) {
        let _0x2e75a1;
        if (_0x340d14.found == false) {
          if (_0x340d14.template) {
            const _0x5e3bda = await _0x340d14.getRandomPixelFromCoverage(0x1d01d, 0x37e1a);
            _0x2e75a1 = [..._0x5e3bda];
            for (const _0x27b932 of _0x2e75a1) {
              await Helper.delay(0x0, _0x7206ff, "Searching on Template Area...", _0x340d14);
              await _0x340d14.checkPixel(_0x27b932, "#FFB470");
              if (_0x340d14.found == true) {
                await _0x340d14.startPainting(_0x27b932, "#FFB470");
                break;
              }
            }
          } else {
            await _0x340d14.selectTemplate();
          }
        }
        if (_0x340d14.found == false) {
          await Helper.delay(0x3e8, _0x7206ff, "Selecting a Global Template...", _0x340d14);
          await Helper.delay(0xbb8, _0x7206ff, "Finding incorrect pixels colors from coverage Area 1...", _0x340d14);
          const _0xef621d = await _0x340d14.getRandomPixelFromCoverage(0x4108e, 0x49180);
          const _0x2873d2 = await _0x340d14.getRandomPixelFromCoverage(0x4bc16, 0x53d08);
          _0x2e75a1 = [..._0xef621d, ..._0x2873d2];
          for (const _0x17895b of _0x2e75a1) {
            await Helper.delay(0x0, _0x7206ff, "Searching on Area 1...", _0x340d14);
            await _0x340d14.checkPixel(_0x17895b, "#00756F");
            if (_0x340d14.found == true) {
              await _0x340d14.startPainting(_0x17895b, "#00756F");
              break;
            }
          }
        }
        if (_0x340d14.found == false) {
          const _0x378fb5 = Helper.random(0x0, _0x2e75a1.length);
          await _0x340d14.startPainting(_0x2e75a1[_0x378fb5], "#00756F");
        }
        _0x340d14.found = false;
      } else {
        const _0x4fa408 = Helper.random(0x1, 0xf4240);
        await _0x340d14.startPainting(_0x4fa408);
      }
    }
    await _0x340d14.claimMining();
    const _0x145206 = Config.USEAUTOUPGRADE ?? true;
    if (_0x145206) {
      if (_0x340d14.mining.boosts.reChargeSpeed != 0x7) {
        await _0x340d14.upgrade("reChargeSpeed");
      }
      if (_0x340d14.mining.boosts.paintReward != 0xb) {
        await _0x340d14.upgrade("paintReward");
      }
      if (_0x340d14.mining.boosts.energyLimit != 0x7) {
        await _0x340d14.upgrade("energyLimit");
      }
    }
    const _0x4be857 = Config.MODE ?? 0x2;
    const _0x85af8d = Helper.random(0xbb8, 0x2710);
    const _0x3ed89c = Config.CUSTOMDELAYINMIN ? Config.CUSTOMDELAYINMIN * 0xea60 : undefined;
    if (_0x4be857 == 0x2) {
      await Helper.delay(_0x3ed89c ? _0x3ed89c : _0x85af8d + _0x340d14.mining.reChargeTimer, _0x7206ff, "Account " + _0x7206ff.id + " Processing Complete, Restarting in " + Helper.msToTime(_0x85af8d + _0x340d14.mining.reChargeTimer), _0x340d14);
      await operation(_0x7206ff, _0x3acd21, _0x59ae82, _0x51f8a7);
    } else {
      await Helper.delay(0x2710, _0x7206ff, "Account " + _0x7206ff.id + " Processing Complete, Continue Using next account in 10 Seconds", _0x340d14);
      await a0_0x375d88.clear(_0x7206ff);
    }
  } catch (_0x49344f) {
    if (_0x49344f.message.includes("401")) {
      if (_0x7206ff.type == 'query') {
        await Helper.delay(0x3e8, _0x7206ff, "Error : " + _0x49344f.message + ", Query Is Expired, Please Get New Query");
      } else {
        await Helper.delay(0x1388, _0x7206ff, "Error : " + _0x49344f.message + ", Query Is Expired, Getting New Query in 5 Seconds");
        const _0x41e1db = new Telegram();
        await _0x41e1db.useSession(_0x7206ff.accounts, _0x51f8a7);
        const _0xdf0396 = await _0x41e1db.client.getMe();
        _0xdf0396.type = "sessions";
        _0xdf0396.accounts = _0x7206ff.accounts;
        _0xdf0396.id = _0xdf0396.id.value;
        const _0x172794 = await _0x41e1db.resolvePeer(_0xdf0396).then(async () => {
          return await _0x41e1db.initWebView();
        })["catch"](_0x36959c => {
          throw _0x36959c;
        });
        const _0x304bdd = Helper.queryToJSON(_0x172794);
        await _0x41e1db.disconnect();
        await Helper.delay(0x1388, _0xdf0396, "Successfully get new query");
        await operation(_0xdf0396, _0x172794, _0x304bdd, _0x51f8a7);
      }
    } else {
      await Helper.delay(0x1388, _0x7206ff, "Error : " + _0x49344f.message + ", Retrying after 5 Seconds");
      await operation(_0x7206ff, _0x3acd21, _0x59ae82, _0x51f8a7);
    }
  }
}
let init = false;
async function startBot() {
  return new Promise(async (_0x273b87, _0x34f42a) => {
    try {
      a0_0x181001.info("BOT STARTED");
      const _0x283e79 = await new Telegram();
      if (init == false) {
        await _0x283e79.init();
        init = true;
      }
      const _0x45d66f = Helper.getSession("accounts");
      const _0x16bc17 = [];
      if (proxyList.length > 0x0) {
        if (_0x45d66f.length != proxyList.length) {
          _0x34f42a("You have " + _0x45d66f.length + " Session but you provide " + proxyList.length + " Proxy");
        }
      }
      for (const _0x2ffea1 of _0x45d66f) {
        const _0x21a5b3 = _0x45d66f.indexOf(_0x2ffea1);
        const _0x133cf2 = proxyList.length > 0x0 ? proxyList[_0x21a5b3] : undefined;
        if (!_0x2ffea1.includes("query")) {
          await _0x283e79.useSession("accounts/" + _0x2ffea1, _0x133cf2);
          _0x283e79.session = _0x2ffea1;
          const _0xcd5c5d = await _0x283e79.client.getMe();
          _0xcd5c5d.type = "sessions";
          _0xcd5c5d.accounts = 'accounts/' + _0x2ffea1;
          _0xcd5c5d.id = _0xcd5c5d.id.value;
          const _0x4ae53c = await _0x283e79.resolvePeer(_0xcd5c5d).then(async () => {
            return await _0x283e79.initWebView();
          })['catch'](_0x1bbaaa => {
            throw _0x1bbaaa;
          });
          const _0x23aadf = Helper.queryToJSON(_0x4ae53c);
          await _0x283e79.disconnect();
          _0x16bc17.push([_0xcd5c5d, _0x4ae53c, _0x23aadf, _0x133cf2]);
        } else {
          let _0xccab7a = Helper.readQueryFile("accounts/" + _0x2ffea1 + "/query.txt");
          let _0x175245 = Helper.queryToJSON(_0xccab7a);
          if (!_0x175245.user) {
            _0x175245 = await Helper.queryToJSON(await Helper.launchParamToQuery(_0xccab7a));
            _0xccab7a = await Helper.launchParamToQuery(_0xccab7a);
          }
          const _0x1666c9 = _0x175245.user;
          _0x1666c9.type = "query";
          _0x1666c9.firstName = _0x1666c9.first_name;
          _0x1666c9.lastName = _0x1666c9.last_name;
          _0x16bc17.push([_0x1666c9, _0xccab7a, _0x175245, _0x133cf2]);
        }
      }
      const _0xe85b50 = Config.MODE ?? 0x2;
      if (_0xe85b50 == 0x2) {
        const _0x103e45 = _0x16bc17.map(async _0x403e3f => {
          await operation(_0x403e3f[0x0], _0x403e3f[0x1], _0x403e3f[0x2], _0x403e3f[0x3]);
        });
        await Promise.all(_0x103e45);
      } else {
        while (true) {
          for (const _0x23e121 of _0x16bc17) {
            await operation(_0x23e121[0x0], _0x23e121[0x1], _0x23e121[0x2], _0x23e121[0x3]);
          }
          const _0x177329 = Config.CUSTOMDELAYINMIN ? Config.CUSTOMDELAYINMIN * 0xea60 : undefined;
          await Helper.delay(_0x177329 ? _0x177329 : 600000, undefined, "All Account Processing Complete");
          await a0_0x375d88.clearInfo();
          conosole.log();
          conosole.log();
          conosole.log("-> New Iteration");
        }
      }
      _0x273b87();
    } catch (_0x54580a) {
      a0_0x181001.info("BOT STOPPED");
      a0_0x181001.error(JSON.stringify(_0x54580a));
      _0x34f42a(_0x54580a);
    }
  });
}
(async () => {
  try {
    a0_0x181001.clear();
    a0_0x181001.info('');
    a0_0x181001.info("Application Started");
    console.log("Not Pixel BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x362885) {
    await a0_0x375d88.clear();
    await a0_0x375d88.clearInfo();
    console.log("Error During executing bot", _0x362885);
    await startBot();
  }
})();
