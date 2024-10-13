import a3_0x5f19b6 from 'input';
import { Helper } from '../utils/helper.js';
import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions/StoreSession.js';
import a3_0x319d38 from '../utils/logger.js';
import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
import { Config } from '../../config/config.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { LogLevel } from 'telegram/extensions/Logger.js';
export class Telegram {
  ["storeSession"];
  constructor() {
    this.accountName = 'accounts';
    this.url = "https://image.notpx.app/";
    this.bot = "notpx_bot";
  }
  async ["init"]() {
    try {
      await this.onBoarding();
    } catch (_0x481549) {
      console.log(_0x481549);
      a3_0x319d38.error('' + JSON.stringify(_0x481549));
      throw _0x481549;
    }
  }
  async ["onBoarding"]() {
    try {
      let _0x380ffb = "Welcome to Bot \nBy : INSIDERS \n \nLets getting started.\n \nYour Session List:\n";
      const _0x56b879 = Helper.getSession("accounts");
      if (_0x56b879.length == 0x0) {
        _0x380ffb += "<empty>";
      } else {
        for (const _0x2e2dbd of _0x56b879) {
          _0x380ffb += "- " + _0x2e2dbd + "\n";
        }
      }
      _0x380ffb += "\n \nPlease Choose a menu: \n";
      _0x380ffb += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
      const _0x3d4861 = await a3_0x5f19b6.text(_0x380ffb);
      if (_0x3d4861 == 0x1) {
        await this.accountType();
      } else {
        if (_0x3d4861 == 0x2) {
          Helper.resetAccounts();
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          if (_0x3d4861 == 0x3) {
            if (Helper.getSession(this.accountName)?.["length"] == 0x0) {
              console.info("You don't have any Accounts, please create first");
              await this.onBoarding();
            }
          } else if (_0x3d4861 == 0x4) {
            await this.queryModificaiton();
          } else {
            console.error("Invalid input, Please try again");
            await this.onBoarding();
          }
        }
      }
    } catch (_0x2844a0) {
      throw _0x2844a0;
    }
  }
  async ["queryModificaiton"]() {
    try {
      const _0x465b12 = Helper.getSession('accounts');
      const _0x283cbb = _0x465b12.filter(_0x40f027 => _0x40f027.includes('query'));
      let _0x1102e9 = "Your Query Account List :\n \n";
      for (const _0x53c1c6 of _0x283cbb) {
        _0x1102e9 += _0x465b12.indexOf(_0x53c1c6) + 0x1 + ". " + _0x53c1c6 + "\n";
      }
      if (_0x283cbb.length == 0x0) {
        console.log("You dont have any Query Account.");
        await this.onBoarding();
      } else {
        _0x1102e9 += "\n \nPlease Select Query Account for modification:";
      }
      const _0x544626 = await a3_0x5f19b6.text(_0x1102e9);
      if (_0x283cbb[_0x544626 - 0x1] != undefined) {
        const _0x5eb483 = _0x283cbb[_0x544626 - 0x1];
        this.accountName = "accounts/" + _0x5eb483;
        const _0x56714b = "Old Query : " + Helper.readQueryFile(this.accountName + '/query.txt') + "\n \nPlease Enter New Query ";
        const _0x35f0f4 = await a3_0x5f19b6.text(_0x56714b);
        await Helper.saveQueryFile(this.accountName, _0x35f0f4);
        await Helper.delay(0xbb8);
        await this.onBoarding();
      } else {
        console.error("Invalid input, Please try again");
        await this.queryModificaiton();
      }
    } catch (_0x4f7596) {
      throw _0x4f7596;
    }
  }
  async ["sessionCreation"]() {
    try {
      if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
        throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
      }
      const _0x44d6f1 = Helper.getSession("accounts");
      let _0x54ee47 = "Your Account List :\n \n";
      for (const _0x1c2156 of _0x44d6f1) {
        _0x54ee47 += _0x44d6f1.indexOf(_0x1c2156) + 0x1 + ". " + _0x1c2156 + "\n";
      }
      if (_0x44d6f1.length == 0x0) {
        _0x54ee47 += "<empty> \n \nPlease enter Session Name :";
      } else {
        _0x54ee47 += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
      }
      const _0x1564a3 = await a3_0x5f19b6.text(_0x54ee47);
      this.accountName = Helper.createDir("sessions-" + _0x1564a3);
      await this.useSession(this.accountName);
      await this.disconnect();
      a3_0x319d38.info("Session " + this.accountName + " - Created");
      console.log("Session " + _0x1564a3 + " - Created, Please Restart The Bot Again");
      this.storeSession.save();
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0xdea6da) {
      throw _0xdea6da;
    }
  }
  async ['queryCreation']() {
    try {
      const _0x35e7af = Helper.getSession('accounts');
      let _0x35383e = "Your Account List :\n \n";
      for (const _0x5611af of _0x35e7af) {
        _0x35383e += _0x35e7af.indexOf(_0x5611af) + 0x1 + ". " + _0x5611af + "\n";
      }
      if (_0x35e7af.length == 0x0) {
        _0x35383e += "<empty> \n \nPlease enter Account Name :";
      } else {
        _0x35383e += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
      }
      const _0x39a0bc = await a3_0x5f19b6.text(_0x35383e);
      this.accountName = Helper.createDir("query-" + _0x39a0bc);
      const _0x20f94d = await a3_0x5f19b6.text("Please Enter Telegram Query : ");
      await Helper.saveQueryFile(this.accountName, _0x20f94d);
      a3_0x319d38.info("Query " + this.accountName + " - Created");
      console.log("Query " + _0x39a0bc + " - Created, Please Restart The Bot Again");
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x1bc3e1) {
      throw _0x1bc3e1;
    }
  }
  async ["accountType"]() {
    try {
      const _0x9e3e21 = Helper.getSession("accounts");
      let _0x5edf66 = "Your Account List :\n \n";
      if (_0x9e3e21.length > 0x0) {
        for (const _0x4feaf1 of _0x9e3e21) {
          _0x5edf66 += _0x9e3e21.indexOf(_0x4feaf1) + 0x1 + ". " + _0x4feaf1 + "\n";
        }
      } else {
        _0x5edf66 += "<empty>\n";
      }
      _0x5edf66 += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
      const _0x2e2053 = await a3_0x5f19b6.text(_0x5edf66);
      if (_0x2e2053 == 0x1) {
        await this.sessionCreation();
      } else if (_0x2e2053 == 0x2) {
        await this.queryCreation();
      } else {
        console.log("Invalid Input");
        await this.accountType();
      }
    } catch (_0x8bb7a4) {
      throw _0x8bb7a4;
    }
  }
  async ["useSession"](_0x367d92, _0x8ea0fe) {
    try {
      this.proxy = _0x8ea0fe;
      const _0x5ab13a = {
        'connectionRetries': 0x5
      };
      if (this.proxy) {
        _0x5ab13a.agent = new HttpsProxyAgent(this.proxy);
      }
      this.storeSession = new StoreSession(_0x367d92);
      this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x5ab13a);
      this.client.setLogLevel(LogLevel.ERROR);
      this.storeSession.save();
      await this.client.start({
        'phoneNumber': async () => await a3_0x5f19b6.text("Enter your Telegram Phone Number ?"),
        'password': async () => await a3_0x5f19b6.text("Enter your Telegram Password?"),
        'phoneCode': async () => await a3_0x5f19b6.text("Enter your Telegram Verification Code ?"),
        'onError': _0x16c3cd => {
          console.log(_0x16c3cd.message);
        }
      });
    } catch (_0x39c2dc) {
      throw _0x39c2dc;
    }
  }
  async ["resolvePeer"](_0x310460) {
    try {
      a3_0x319d38.info("Session " + this.session + " - Resolving Peer");
      while (this.peer == undefined) {
        try {
          this.peer = await this.client.getEntity(this.bot);
          break;
        } catch (_0x4ddd56) {
          if (_0x4ddd56 instanceof FloodWaitError) {
            const _0x897b70 = _0x4ddd56.seconds;
            a3_0x319d38.warn(this.client.session.serverAddress + " | FloodWait " + _0x4ddd56);
            a3_0x319d38.info(this.client.session.serverAddress + " | Sleep " + _0x897b70 + 's');
            await Helper.delay(_0x897b70 * 0x3e8, _0x310460, this.client.session.serverAddress + " | FloodWait " + _0x4ddd56);
          } else {
            throw _0x4ddd56;
          }
        }
      }
    } catch (_0x3fe6bd) {
      throw _0x3fe6bd;
    }
  }
  async ["disconnect"]() {
    await this.client.disconnect();
    await this.client.destroy();
    this.peer = undefined;
    this.accountName = undefined;
  }
  async ["initWebView"]() {
    try {
      const _0x39dd61 = await this.client.invoke(new Api.messages.RequestWebView({
        'peer': this.peer,
        'bot': this.peer,
        'fromBotMenu': true,
        'url': this.url,
        'platform': 'android'
      }));
      a3_0x319d38.info("Session " + this.session + " - Webview Connected");
      const _0x4539f1 = _0x39dd61.url;
      return Helper.getTelegramQuery(_0x4539f1, 0x3);
    } catch (_0x507a1a) {
      throw _0x507a1a;
    }
  }
}