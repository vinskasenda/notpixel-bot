import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import { Core } from './src/core/core.js';
import { Telegram } from './src/core/telegram.js';
import { Helper } from './src/utils/helper.js';
import a0_0xad48f8 from './src/utils/logger.js';
import a0_0x3fa2d3 from './src/utils/twist.js';
async function operation(_0x3b5e2b, _0x4d0ed6, _0x1e9448, _0x2f38bd) {
  try {
    const _0x1dee85 = new Core(_0x3b5e2b, _0x4d0ed6, _0x1e9448, _0x2f38bd);
    const _0x1a6a71 = Config.REPAINTER ?? true;
    await _0x1dee85.getMiningStatus(true);
    await _0x1dee85.checkUserSelectedTemplate();
    while (_0x1dee85.mining.charges != 0x0) {
      if (_0x1a6a71 == true) {
        let _0x10c2a8;
        if (_0x1dee85.found == false) {
          if (_0x1dee85.template) {
            const _0x13c8d0 = await _0x1dee85.getRandomPixelFromCoverage(0x42308, 0x47977);
            const _0x5c0ebb = await _0x1dee85.getRandomPixelFromCoverage(0x47ce0, 0x60f4e);
            _0x10c2a8 = [..._0x13c8d0, ..._0x5c0ebb];
            for (const _0xe69d11 of _0x10c2a8) {
              await Helper.delay(0x0, _0x3b5e2b, "Searching on Template Area...", _0x1dee85);
              await _0x1dee85.checkPixel(_0xe69d11, "#000000");
              if (_0x1dee85.found == true) {
                await _0x1dee85.startPainting(_0xe69d11, '#000000');
                break;
              }
            }
          }
        }
        await Helper.delay(0x3e8, _0x3b5e2b, "Selecting a Global Template...", _0x1dee85);
        if (_0x1dee85.found == false) {
          await Helper.delay(0xbb8, _0x3b5e2b, "Finding incorrect pixels colors from coverage Area 1...", _0x1dee85);
          const _0xf3147c = await _0x1dee85.getRandomPixelFromCoverage(0x4108e, 0x49180);
          const _0x29977b = await _0x1dee85.getRandomPixelFromCoverage(0x4bc16, 0x53d08);
          _0x10c2a8 = [..._0xf3147c, ..._0x29977b];
          for (const _0x5b722a of _0x10c2a8) {
            await Helper.delay(0x0, _0x3b5e2b, "Searching on Area 1...", _0x1dee85);
            await _0x1dee85.checkPixel(_0x5b722a, '#00756F');
            if (_0x1dee85.found == true) {
              await _0x1dee85.startPainting(_0x5b722a, "#00756F");
              break;
            }
          }
        }
        if (_0x1dee85.found == false) {
          const _0x307835 = Helper.random(0x0, _0x10c2a8.length);
          await _0x1dee85.startPainting(_0x10c2a8[_0x307835], "#00756F");
        }
        _0x1dee85.found = false;
      } else {
        const _0x3a5d37 = Helper.random(0x1, 0xf4240);
        await _0x1dee85.startPainting(_0x3a5d37);
      }
    }
    await _0x1dee85.claimMining();
    const _0x263cf6 = Config.USEAUTOUPGRADE ?? true;
    if (_0x263cf6) {
      if (_0x1dee85.mining.boosts.reChargeSpeed != 0x7) {
        await _0x1dee85.upgrade('reChargeSpeed');
      }
      if (_0x1dee85.mining.boosts.paintReward != 0xb) {
        await _0x1dee85.upgrade("paintReward");
      }
      if (_0x1dee85.mining.boosts.energyLimit != 0x7) {
        await _0x1dee85.upgrade("energyLimit");
      }
    }
    const _0x5a3617 = Config.MODE ?? 0x2;
    const _0x2b1e21 = Helper.random(0xbb8, 0x2710);
    const _0x5acb6f = Config.CUSTOMDELAYINMIN ? Config.CUSTOMDELAYINMIN * 0xea60 : undefined;
    if (_0x5a3617 == 0x2) {
      await Helper.delay(_0x5acb6f ? _0x5acb6f : _0x2b1e21 + _0x1dee85.mining.reChargeTimer, _0x3b5e2b, "Account " + _0x3b5e2b.id + " Processing Complete, Restarting in " + Helper.msToTime(_0x2b1e21 + _0x1dee85.mining.reChargeTimer), _0x1dee85);
      await operation(_0x3b5e2b, _0x4d0ed6, _0x1e9448, _0x2f38bd);
    } else {
      await Helper.delay(0x2710, _0x3b5e2b, "Account " + _0x3b5e2b.id + " Processing Complete, Continue Using next account in 10 Seconds", _0x1dee85);
      await a0_0x3fa2d3.clear(_0x3b5e2b);
    }
  } catch (_0xe08495) {
    if (_0xe08495.message.includes("401")) {
      if (_0x3b5e2b.type == 'query') {
        await Helper.delay(0x3e8, _0x3b5e2b, "Error : " + _0xe08495.message + ", Query Is Expired, Please Get New Query");
      } else {
        await Helper.delay(0x1388, _0x3b5e2b, "Error : " + _0xe08495.message + ", Query Is Expired, Getting New Query in 5 Seconds");
        const _0x1a787e = new Telegram();
        await _0x1a787e.useSession(_0x3b5e2b.accounts, _0x2f38bd);
        const _0xfbaac3 = await _0x1a787e.client.getMe();
        _0xfbaac3.type = "sessions";
        _0xfbaac3.accounts = _0x3b5e2b.accounts;
        _0xfbaac3.id = _0xfbaac3.id.value;
        const _0x13c2e7 = await _0x1a787e.resolvePeer(_0xfbaac3).then(async () => {
          return await _0x1a787e.initWebView();
        })['catch'](_0x36ffea => {
          throw _0x36ffea;
        });
        const _0x25c678 = Helper.queryToJSON(_0x13c2e7);
        await _0x1a787e.disconnect();
        await Helper.delay(0x1388, _0xfbaac3, "Successfully get new query");
        await operation(_0xfbaac3, _0x13c2e7, _0x25c678, _0x2f38bd);
      }
    } else {
      await Helper.delay(0x1388, _0x3b5e2b, "Error : " + _0xe08495.message + ", Retrying after 5 Seconds");
      await operation(_0x3b5e2b, _0x4d0ed6, _0x1e9448, _0x2f38bd);
    }
  }
}
let init = false;
async function startBot() {
  return new Promise(async (_0x18c5fd, _0x243f60) => {
    try {
      a0_0xad48f8.info("BOT STARTED");
      const _0x3c15c6 = await new Telegram();
      if (init == false) {
        await _0x3c15c6.init();
        init = true;
      }
      const _0x1c4901 = Helper.getSession("accounts");
      const _0x190dc8 = [];
      if (proxyList.length > 0x0) {
        if (_0x1c4901.length != proxyList.length) {
          _0x243f60("You have " + _0x1c4901.length + " Session but you provide " + proxyList.length + " Proxy");
        }
      }
      for (const _0x460759 of _0x1c4901) {
        const _0x463c4e = _0x1c4901.indexOf(_0x460759);
        const _0x3b2be8 = proxyList.length > 0x0 ? proxyList[_0x463c4e] : undefined;
        if (!_0x460759.includes('query')) {
          await _0x3c15c6.useSession('accounts/' + _0x460759, _0x3b2be8);
          _0x3c15c6.session = _0x460759;
          const _0x4d119c = await _0x3c15c6.client.getMe();
          _0x4d119c.type = "sessions";
          _0x4d119c.accounts = "accounts/" + _0x460759;
          _0x4d119c.id = _0x4d119c.id.value;
          const _0x141749 = await _0x3c15c6.resolvePeer(_0x4d119c).then(async () => {
            return await _0x3c15c6.initWebView();
          })["catch"](_0x23e1bc => {
            throw _0x23e1bc;
          });
          const _0x4e5fe6 = Helper.queryToJSON(_0x141749);
          await _0x3c15c6.disconnect();
          _0x190dc8.push([_0x4d119c, _0x141749, _0x4e5fe6, _0x3b2be8]);
        } else {
          let _0x370bff = Helper.readQueryFile("accounts/" + _0x460759 + "/query.txt");
          let _0x5e6e4d = Helper.queryToJSON(_0x370bff);
          if (!_0x5e6e4d.user) {
            _0x5e6e4d = await Helper.queryToJSON(await Helper.launchParamToQuery(_0x370bff));
            _0x370bff = await Helper.launchParamToQuery(_0x370bff);
          }
          const _0xc529f4 = _0x5e6e4d.user;
          _0xc529f4.type = "query";
          _0xc529f4.firstName = _0xc529f4.first_name;
          _0xc529f4.lastName = _0xc529f4.last_name;
          _0x190dc8.push([_0xc529f4, _0x370bff, _0x5e6e4d, _0x3b2be8]);
        }
      }
      const _0x5da0ba = Config.MODE ?? 0x2;
      if (_0x5da0ba == 0x2) {
        const _0x2c8f24 = _0x190dc8.map(async _0x17fd8c => {
          await operation(_0x17fd8c[0x0], _0x17fd8c[0x1], _0x17fd8c[0x2], _0x17fd8c[0x3]);
        });
        await Promise.all(_0x2c8f24);
      } else {
        while (true) {
          for (const _0x3e53b8 of _0x190dc8) {
            await operation(_0x3e53b8[0x0], _0x3e53b8[0x1], _0x3e53b8[0x2], _0x3e53b8[0x3]);
          }
          const _0x253cf3 = Config.CUSTOMDELAYINMIN ? Config.CUSTOMDELAYINMIN * 0xea60 : undefined;
          await Helper.delay(_0x253cf3 ? _0x253cf3 : 600000, undefined, "All Account Processing Complete");
          await a0_0x3fa2d3.clearInfo();
          conosole.log();
          conosole.log();
          conosole.log("-> New Iteration");
        }
      }
      _0x18c5fd();
    } catch (_0x5741fb) {
      a0_0xad48f8.info("BOT STOPPED");
      a0_0xad48f8.error(JSON.stringify(_0x5741fb));
      _0x243f60(_0x5741fb);
    }
  });
}
(async () => {
  try {
    a0_0xad48f8.clear();
    a0_0xad48f8.info('');
    a0_0xad48f8.info("Application Started");
    console.log("Not Pixel BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x156aa3) {
    await a0_0x3fa2d3.clear();
    await a0_0x3fa2d3.clearInfo();
    console.log("Error During executing bot", _0x156aa3);
    await startBot();
  }
})();