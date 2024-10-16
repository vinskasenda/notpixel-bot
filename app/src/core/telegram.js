import a3_0x136501 from 'input';
import { Helper } from '../utils/helper.js';
import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions/StoreSession.js';
import a3_0x4b8a64 from '../utils/logger.js';
import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
import { Config } from '../../config/config.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { LogLevel } from 'telegram/extensions/Logger.js';
export class Telegram {
  ["storeSession"];
  constructor() {
    this.accountName = "accounts";
    this.url = "https://image.notpx.app/";
    this.bot = "notpx_bot";
  }
  async ["init"]() {
    try {
      await this.onBoarding();
    } catch (_0x1f3d91) {
      console.log(_0x1f3d91);
      a3_0x4b8a64.error('' + JSON.stringify(_0x1f3d91));
      throw _0x1f3d91;
    }
  }
  async ["onBoarding"]() {
    try {
      let _0x2474a7 = "Welcome to Bot \nBy : INSIDERS \n \nLets getting started.\n \nYour Session List:\n";
      const _0x527436 = Helper.getSession("accounts");
      if (_0x527436.length == 0x0) {
        _0x2474a7 += "<empty>";
      } else {
        for (const _0x3e7db9 of _0x527436) {
          _0x2474a7 += "- " + _0x3e7db9 + "\n";
        }
      }
      _0x2474a7 += "\n \nPlease Choose a menu: \n";
      _0x2474a7 += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
      const _0x56fe32 = await a3_0x136501.text(_0x2474a7);
      if (_0x56fe32 == 0x1) {
        await this.accountType();
      } else {
        if (_0x56fe32 == 0x2) {
          Helper.resetAccounts();
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          if (_0x56fe32 == 0x3) {
            if (Helper.getSession(this.accountName)?.['length'] == 0x0) {
              console.info("You don't have any Accounts, please create first");
              await this.onBoarding();
            }
          } else if (_0x56fe32 == 0x4) {
            await this.queryModificaiton();
          } else {
            console.error("Invalid input, Please try again");
            await this.onBoarding();
          }
        }
      }
    } catch (_0x2a5374) {
      throw _0x2a5374;
    }
  }
  async ["queryModificaiton"]() {
    try {
      const _0x31429f = Helper.getSession('accounts');
      const _0x100d7e = _0x31429f.filter(_0x3a3e00 => _0x3a3e00.includes("query"));
      let _0x408177 = "Your Query Account List :\n \n";
      for (const _0x57e2ab of _0x100d7e) {
        _0x408177 += _0x31429f.indexOf(_0x57e2ab) + 0x1 + ". " + _0x57e2ab + "\n";
      }
      if (_0x100d7e.length == 0x0) {
        console.log("You dont have any Query Account.");
        await this.onBoarding();
      } else {
        _0x408177 += "\n \nPlease Select Query Account for modification:";
      }
      const _0x41fc84 = await a3_0x136501.text(_0x408177);
      if (_0x100d7e[_0x41fc84 - 0x1] != undefined) {
        const _0x25ca9 = _0x100d7e[_0x41fc84 - 0x1];
        this.accountName = "accounts/" + _0x25ca9;
        const _0x33be11 = "Old Query : " + Helper.readQueryFile(this.accountName + '/query.txt') + "\n \nPlease Enter New Query ";
        const _0x3a16b9 = await a3_0x136501.text(_0x33be11);
        await Helper.saveQueryFile(this.accountName, _0x3a16b9);
        await Helper.delay(0xbb8);
        await this.onBoarding();
      } else {
        console.error("Invalid input, Please try again");
        await this.queryModificaiton();
      }
    } catch (_0xa6ea2c) {
      throw _0xa6ea2c;
    }
  }
  async ["sessionCreation"]() {
    try {
      if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
        throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
      }
      const _0x5c76ef = Helper.getSession("accounts");
      let _0x2e6eba = "Your Account List :\n \n";
      for (const _0x13b03f of _0x5c76ef) {
        _0x2e6eba += _0x5c76ef.indexOf(_0x13b03f) + 0x1 + ". " + _0x13b03f + "\n";
      }
      if (_0x5c76ef.length == 0x0) {
        _0x2e6eba += "<empty> \n \nPlease enter Session Name :";
      } else {
        _0x2e6eba += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
      }
      const _0xdc30f5 = await a3_0x136501.text(_0x2e6eba);
      this.accountName = Helper.createDir('sessions-' + _0xdc30f5);
      await this.useSession(this.accountName);
      await this.disconnect();
      a3_0x4b8a64.info("Session " + this.accountName + " - Created");
      console.log("Session " + _0xdc30f5 + " - Created, Please Restart The Bot Again");
      this.storeSession.save();
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x225612) {
      throw _0x225612;
    }
  }
  async ["queryCreation"]() {
    try {
      const _0x1d1971 = Helper.getSession("accounts");
      let _0x1222a5 = "Your Account List :\n \n";
      for (const _0x4ea0df of _0x1d1971) {
        _0x1222a5 += _0x1d1971.indexOf(_0x4ea0df) + 0x1 + ". " + _0x4ea0df + "\n";
      }
      if (_0x1d1971.length == 0x0) {
        _0x1222a5 += "<empty> \n \nPlease enter Account Name :";
      } else {
        _0x1222a5 += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
      }
      const _0x5728b9 = await a3_0x136501.text(_0x1222a5);
      this.accountName = Helper.createDir("query-" + _0x5728b9);
      const _0x431c49 = await a3_0x136501.text("Please Enter Telegram Query : ");
      await Helper.saveQueryFile(this.accountName, _0x431c49);
      a3_0x4b8a64.info("Query " + this.accountName + " - Created");
      console.log("Query " + _0x5728b9 + " - Created, Please Restart The Bot Again");
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x419bb1) {
      throw _0x419bb1;
    }
  }
  async ['accountType']() {
    try {
      const _0xe4acbf = Helper.getSession("accounts");
      let _0x54a41d = "Your Account List :\n \n";
      if (_0xe4acbf.length > 0x0) {
        for (const _0x31d983 of _0xe4acbf) {
          _0x54a41d += _0xe4acbf.indexOf(_0x31d983) + 0x1 + ". " + _0x31d983 + "\n";
        }
      } else {
        _0x54a41d += "<empty>\n";
      }
      _0x54a41d += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
      const _0x574ed9 = await a3_0x136501.text(_0x54a41d);
      if (_0x574ed9 == 0x1) {
        await this.sessionCreation();
      } else if (_0x574ed9 == 0x2) {
        await this.queryCreation();
      } else {
        console.log("Invalid Input");
        await this.accountType();
      }
    } catch (_0x5dbb7a) {
      throw _0x5dbb7a;
    }
  }
  async ["useSession"](_0x4f996c, _0x4bf18d) {
    try {
      this.proxy = _0x4bf18d;
      const _0x456cdb = {
        'connectionRetries': 0x5
      };
      if (this.proxy) {
        _0x456cdb.agent = new HttpsProxyAgent(this.proxy);
      }
      this.storeSession = new StoreSession(_0x4f996c);
      this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x456cdb);
      this.client.setLogLevel(LogLevel.ERROR);
      this.storeSession.save();
      await this.client.start({
        'phoneNumber': async () => await a3_0x136501.text("Enter your Telegram Phone Number ?"),
        'password': async () => await a3_0x136501.text("Enter your Telegram Password?"),
        'phoneCode': async () => await a3_0x136501.text("Enter your Telegram Verification Code ?"),
        'onError': _0x9a546b => {
          console.log(_0x9a546b.message);
        }
      });
    } catch (_0x49e592) {
      throw _0x49e592;
    }
  }
  async ["resolvePeer"](_0x45a35a) {
    try {
      a3_0x4b8a64.info("Session " + this.session + " - Resolving Peer");
      while (this.peer == undefined) {
        try {
          this.peer = await this.client.getEntity(this.bot);
          break;
        } catch (_0x39e39a) {
          if (_0x39e39a instanceof FloodWaitError) {
            const _0x3ecb45 = _0x39e39a.seconds;
            a3_0x4b8a64.warn(this.client.session.serverAddress + " | FloodWait " + _0x39e39a);
            a3_0x4b8a64.info(this.client.session.serverAddress + " | Sleep " + _0x3ecb45 + 's');
            await Helper.delay(_0x3ecb45 * 0x3e8, _0x45a35a, this.client.session.serverAddress + " | FloodWait " + _0x39e39a);
          } else {
            throw _0x39e39a;
          }
        }
      }
    } catch (_0x24a1cc) {
      throw _0x24a1cc;
    }
  }
  async ['disconnect']() {
    await this.client.disconnect();
    await this.client.destroy();
    this.peer = undefined;
    this.accountName = undefined;
  }
  async ["initWebView"]() {
    try {
      const _0x1f8541 = await this.client.invoke(new Api.messages.RequestWebView({
        'peer': this.peer,
        'bot': this.peer,
        'fromBotMenu': true,
        'url': this.url,
        'platform': "android"
      }));
      a3_0x4b8a64.info("Session " + this.session + " - Webview Connected");
      const _0x4d6cde = _0x1f8541.url;
      return Helper.getTelegramQuery(_0x4d6cde, 0x3);
    } catch (_0x521b75) {
      throw _0x521b75;
    }
  }
}
