import { API } from '../api/api.js';
import { Helper } from '../utils/helper.js';
export class Core extends API {
  constructor(_0x84a0cf, _0x24514f, _0x63b921, _0x38a195) {
    super(_0x24514f, _0x38a195, 'https://notpx.app', "notpx.app", "https://image.notpx.app", 'https://image.notpx.app/');
    this.account = _0x84a0cf;
    this.query = _0x24514f;
    this.queryObj = _0x63b921;
    this.colorList = ['#e46e6e', "#FFD635", "#7EED56", '#00CCC0', '#51E9F4', "#94B3FF", '#E4ABFF', "#FF99AA", "#FF99AA"];
    this.completeGameErrorCount = 0x0;
    this.upgradable = {
      'reChargeSpeed': true,
      'energyLimit': true,
      'paintReward': true
    };
    this.found = false;
  }
  async ["getMiningStatus"](_0xccbd37 = false) {
    try {
      if (_0xccbd37) {
        await Helper.delay(0x3e8, this.account, "Getting Mining Status...", this);
      }
      const _0x563206 = await this.fetch("/api/v1/mining/status", 'GET');
      if (_0x563206.status == 0xc8) {
        this.mining = _0x563206;
        if (_0xccbd37) {
          await Helper.delay(0x7d0, this.account, "Successfully Get Mining Status", this);
        }
      } else {
        throw Error("Failed To Get Mining Status");
      }
    } catch (_0x5ebbe3) {
      throw _0x5ebbe3;
    }
  }
  async ['getRandomPixelFromCoverage'](_0x25aaeb, _0x1d26e5) {
    const _0x369d97 = [];
    const _0x51591c = _0x25aaeb % 0x3e8;
    const _0x6c6b85 = Math.floor(_0x25aaeb / 0x3e8);
    const _0x44beb1 = _0x1d26e5 % 0x3e8;
    const _0x2d4c0 = Math.floor(_0x1d26e5 / 0x3e8);
    for (let _0x4bafab = _0x6c6b85; _0x4bafab <= _0x2d4c0; _0x4bafab++) {
      for (let _0x1359ba = _0x4bafab === _0x6c6b85 ? _0x51591c : 0x0; _0x1359ba <= (_0x4bafab === _0x2d4c0 ? _0x44beb1 : 999); _0x1359ba++) {
        const _0x567e7d = _0x4bafab * 0x3e8 + _0x1359ba;
        _0x369d97.push(_0x567e7d);
      }
    }
    return _0x369d97;
  }
  async ["checkPixel"](_0x5f8524, _0x244c22 = "#000000") {
    try {
      const _0xdbad7d = await this.fetch("/api/v1/image/get/" + _0x5f8524, "GET", undefined);
      if (_0xdbad7d.status == 0xc8) {
        if (_0xdbad7d.pixel.color != _0x244c22) {
          await Helper.delay(0x3e8, this.account, "Found Incorrect Pixel " + _0x5f8524 + " -> Current Color : " + _0xdbad7d.pixel.color + " , Correct Color : " + _0x244c22 + "...", this);
          this.found = true;
        } else {
          this.found = false;
        }
      } else {
        this.found = false;
      }
    } catch (_0x3fcc0b) {
      this.found = false;
      if (_0x3fcc0b.message.includes("401")) {
        throw _0x3fcc0b;
      }
    }
  }
  async ["startPainting"](_0xf5c2ff, _0xd61910 = "#000000") {
    try {
      await Helper.delay(0x3e8, this.account, "Start Painting On Block No " + _0xf5c2ff + "...", this);
      const _0x493d9e = {
        'pixelId': _0xf5c2ff,
        'newColor': _0xd61910
      };
      const _0x2e4a3a = await this.fetch("/api/v1/repaint/start", "POST", undefined, _0x493d9e);
      if (_0x2e4a3a.status == 0xc8) {
        await Helper.delay(0xbb8, this.account, "Successfully Painting On Block " + _0xf5c2ff + ", with color " + _0x493d9e.newColor + " \nGot " + (_0x2e4a3a.balance - this.mining.userBalance) + " Points", this);
        await this.getMiningStatus();
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Painting on Block " + _0xf5c2ff, this);
      }
    } catch (_0x760ceb) {
      if (_0x760ceb.message.includes("fetch failed")) {
        await Helper.delay(0x7d0, this.account, "Failed to Painting on Block " + _0xf5c2ff + " - " + _0x760ceb.message, this);
      } else {
        throw _0x760ceb;
      }
    }
  }
  async ["selectTemplate"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Selecting OKX Template...", this);
      const _0x4b0781 = await this.fetch("/api/v1/image/template/1972552043", 'GET', undefined);
      if (_0x4b0781.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "OKX Template Selected", this);
        await Helper.delay(0x7d0, this.account, "Subscribing OKX Template", this);
        const _0x54b7ee = await this.fetch("/api/v1/image/template/subscribe/1972552043", "PUT", undefined);
        if (_0x54b7ee.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Subscribing OKX Template", this);
          this.template = true;
        } else {
          if (_0x54b7ee.status == 0x193) {
            this.template = true;
          } else if (_0x54b7ee.status == 0xcb) {
            await this.selectTemplate();
          } else {
            await Helper.delay(0x3e8, this.account, "Failed to Subscribe OKX Template - " + _0x54b7ee.error, this);
          }
        }
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Select OKX Template", this);
      }
    } catch (_0x42c0c7) {
      throw _0x42c0c7;
    }
  }
  async ["checkUserSelectedTemplate"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Checking User Selected Template...", this);
      const _0x5498a2 = await this.fetch("/api/v1/image/template/my", "GET");
      if (_0x5498a2.status == 0xc8) {
        if (_0x5498a2.id == 0x7592c16b) {
          await Helper.delay(0x7d0, this.account, "User Already Use OKX Template", this);
          this.template = true;
        } else {
          await this.selectTemplate();
        }
      } else if (_0x5498a2.status == 0x194) {
        await this.selectTemplate();
      } else {
        await Helper.delay(0x1388, this.account, "Failed To Check User Template...", this);
      }
    } catch (_0x2088f7) {
      await Helper.delay(0x7d0, this.account, "Failed To Claim Mining Reward, Skipping ...", this);
    }
  }
  async ["claimMining"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Start Claiming Mining Balance...", this);
      const _0x48dc93 = await this.fetch('/api/v1/mining/claim', 'GET');
      if (_0x48dc93.status == 0xc8) {
        await Helper.delay(0x7d0, this.account, "Successfully Claim Mining Reward", this);
        await this.getMiningStatus();
      } else {
        await Helper.delay(0x1388, this.account, "Failed To Claim Mining Reward, Skipping...", this);
      }
    } catch (_0x47069e) {
      await Helper.delay(0x7d0, this.account, "Failed To Claim Mining Reward, Skipping ...", this);
    }
  }
  async ["completeMissionsX"](_0x4193a6) {
    try {
      await Helper.delay(0x1f4, this.account, "Try To Completing Missions X " + _0x4193a6 + "...", this);
      const _0x1cf84b = await this.fetch("/api/v1/mining/task/check/x?name=" + _0x4193a6, 'GET');
      if (_0x1cf84b.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Successfully Complete Task X " + _0x4193a6, this);
        await this.getMiningStatus();
      } else {
        await Helper.delay(0x3e8, this.account, "Failed to Complete Task X " + _0x4193a6 + ", Skipping...", this);
      }
    } catch (_0x2d3ee4) {
      await Helper.delay(0x7d0, this.account, "Failed to Complete Task X " + _0x4193a6 + ", Skipping...", this);
    }
  }
  async ["upgrade"](_0x35ce32) {
    try {
      await Helper.delay(0x1f4, this.account, "Try To Upgrading " + _0x35ce32 + "...", this);
      const _0x23d1ab = await this.fetch("/api/v1/mining/boost/check/" + _0x35ce32, "GET");
      if (_0x23d1ab.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Successfully Upgrade " + _0x35ce32, this);
        await this.getMiningStatus();
      } else {
        throw Error("Failed To Upgrade " + _0x35ce32);
      }
    } catch (_0x32823e) {
      this.upgradable[_0x35ce32] = false;
      await Helper.delay(0x7d0, this.account, "Failed Upgrade " + _0x35ce32 + " - Insufficient balance", this);
    }
  }
}