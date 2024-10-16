import { API } from '../api/api.js';
import { Helper } from '../utils/helper.js';
export class Core extends API {
  constructor(_0x518ea8, _0x2ed622, _0xa2ce75, _0x234a9f) {
    super(_0x2ed622, _0x234a9f, 'https://notpx.app', 'notpx.app', 'https://image.notpx.app', "https://image.notpx.app/");
    this.account = _0x518ea8;
    this.query = _0x2ed622;
    this.queryObj = _0xa2ce75;
    this.colorList = ["#e46e6e", "#FFD635", '#7EED56', '#00CCC0', "#51E9F4", "#94B3FF", "#E4ABFF", "#FF99AA", "#FF99AA"];
    this.completeGameErrorCount = 0x0;
    this.upgradable = {
      'reChargeSpeed': true,
      'energyLimit': true,
      'paintReward': true
    };
    this.found = false;
  }
  async ["getMiningStatus"](_0x50452e = false) {
    try {
      if (_0x50452e) {
        await Helper.delay(0x3e8, this.account, "Getting Mining Status...", this);
      }
      const _0x2fccad = await this.fetch("/api/v1/mining/status", "GET");
      if (_0x2fccad.status == 0xc8) {
        this.mining = _0x2fccad;
        if (_0x50452e) {
          await Helper.delay(0x7d0, this.account, "Successfully Get Mining Status", this);
        }
      } else {
        throw Error("Failed To Get Mining Status");
      }
    } catch (_0x5aedb0) {
      throw _0x5aedb0;
    }
  }
  async ["getRandomPixelFromCoverage"](_0x4ff883, _0x1d6a2d) {
    const _0x47cd69 = [];
    const _0x5393eb = _0x4ff883 % 0x3e8;
    const _0x47d548 = Math.floor(_0x4ff883 / 0x3e8);
    const _0x124864 = _0x1d6a2d % 0x3e8;
    const _0x1b806a = Math.floor(_0x1d6a2d / 0x3e8);
    for (let _0x41cd90 = _0x47d548; _0x41cd90 <= _0x1b806a; _0x41cd90++) {
      for (let _0x15a2cd = _0x41cd90 === _0x47d548 ? _0x5393eb : 0x0; _0x15a2cd <= (_0x41cd90 === _0x1b806a ? _0x124864 : 999); _0x15a2cd++) {
        const _0x1fedbc = _0x41cd90 * 0x3e8 + _0x15a2cd;
        _0x47cd69.push(_0x1fedbc);
      }
    }
    return _0x47cd69;
  }
  async ["checkPixel"](_0x6402bb, _0x117b4f = "#000000") {
    try {
      const _0x4c227b = await this.fetch("/api/v1/image/get/" + _0x6402bb, "GET", undefined);
      if (_0x4c227b.status == 0xc8) {
        if (_0x4c227b.pixel.color != _0x117b4f) {
          await Helper.delay(0x3e8, this.account, "Found Incorrect Pixel " + _0x6402bb + " -> Current Color : " + _0x4c227b.pixel.color + " , Correct Color : " + _0x117b4f + "...", this);
          this.found = true;
        } else {
          this.found = false;
        }
      } else {
        this.found = false;
      }
    } catch (_0x46cb88) {
      this.found = false;
      if (_0x46cb88.message.includes("401")) {
        throw _0x46cb88;
      }
    }
  }
  async ["startPainting"](_0x14d80c, _0x53b6e4 = '#000000') {
    try {
      await Helper.delay(0x3e8, this.account, "Start Painting On Block No " + _0x14d80c + '...', this);
      const _0x1c63f4 = {
        'pixelId': _0x14d80c,
        'newColor': _0x53b6e4
      };
      const _0x250e17 = await this.fetch("/api/v1/repaint/start", "POST", undefined, _0x1c63f4);
      if (_0x250e17.status == 0xc8) {
        await Helper.delay(0xbb8, this.account, "Successfully Painting On Block " + _0x14d80c + ", with color " + _0x1c63f4.newColor + " \nGot " + (_0x250e17.balance - this.mining.userBalance) + " Points", this);
        await this.getMiningStatus();
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Painting on Block " + _0x14d80c, this);
      }
    } catch (_0x86162c) {
      if (_0x86162c.message.includes("fetch failed")) {
        await Helper.delay(0x7d0, this.account, "Failed to Painting on Block " + _0x14d80c + " - " + _0x86162c.message, this);
      } else {
        throw _0x86162c;
      }
    }
  }
  async ['selectTemplate']() {
    try {
      await Helper.delay(0x3e8, this.account, "Selecting Pumpkin Template...", this);
      const _0x45c9ee = await this.fetch("/api/v1/image/template/175225616", "GET", undefined);
      if (_0x45c9ee.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Pumpkin Template Selected", this);
        await Helper.delay(0x7d0, this.account, "Subscribing Pumpkin Template", this);
        const _0x53e001 = await this.fetch("/api/v1/image/template/subscribe/175225616", 'PUT', undefined);
        if (_0x53e001.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Subscribing Pumpkin Template", this);
          this.template = true;
        } else {
          if (_0x53e001.status == 0x193) {
            this.template = true;
          } else if (_0x53e001.status == 0xcb && _0x53e001.status == 0x1f8) {
            await this.selectTemplate();
          } else {
            await Helper.delay(0x3e8, this.account, "Failed to Subscribe Pumpkin Template - " + _0x53e001.error, this);
          }
        }
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Select Pumpkin Template", this);
      }
    } catch (_0x38f42b) {
      throw _0x38f42b;
    }
  }
  async ["checkUserSelectedTemplate"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Checking User Selected Template...", this);
      const _0x9d3e00 = await this.fetch("/api/v1/image/template/my", "GET");
      if (_0x9d3e00.status == 0xc8) {
        if (_0x9d3e00.id == 0xa71bb10) {
          await Helper.delay(0x7d0, this.account, "User Already Use Pumpkin Template", this);
          this.template = true;
        } else {
          await this.selectTemplate();
        }
      } else if (_0x9d3e00.status == 0x194) {
        await this.selectTemplate();
      } else {
        await Helper.delay(0x1388, this.account, "Failed To Check User Template...", this);
      }
    } catch (_0x38d0d3) {
      await Helper.delay(0x7d0, this.account, "Failed To Claim Mining Reward, Skipping ...", this);
    }
  }
  async ["claimMining"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Start Claiming Mining Balance...", this);
      const _0x55c3c2 = await this.fetch("/api/v1/mining/claim", "GET");
      if (_0x55c3c2.status == 0xc8) {
        await Helper.delay(0x7d0, this.account, "Successfully Claim Mining Reward", this);
        await this.getMiningStatus();
      } else {
        await Helper.delay(0x1388, this.account, "Failed To Claim Mining Reward, Skipping...", this);
      }
    } catch (_0x155044) {
      await Helper.delay(0x7d0, this.account, "Failed To Claim Mining Reward, Skipping ...", this);
    }
  }
  async ["completeMissionsX"](_0x2a6e03) {
    try {
      await Helper.delay(0x1f4, this.account, "Try To Completing Missions X " + _0x2a6e03 + "...", this);
      const _0x1e98d7 = await this.fetch("/api/v1/mining/task/check/x?name=" + _0x2a6e03, 'GET');
      if (_0x1e98d7.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Successfully Complete Task X " + _0x2a6e03, this);
        await this.getMiningStatus();
      } else {
        await Helper.delay(0x3e8, this.account, "Failed to Complete Task X " + _0x2a6e03 + ", Skipping...", this);
      }
    } catch (_0x51757e) {
      await Helper.delay(0x7d0, this.account, "Failed to Complete Task X " + _0x2a6e03 + ", Skipping...", this);
    }
  }
  async ['upgrade'](_0x1d13e9) {
    try {
      await Helper.delay(0x1f4, this.account, "Try To Upgrading " + _0x1d13e9 + "...", this);
      const _0x577431 = await this.fetch('/api/v1/mining/boost/check/' + _0x1d13e9, "GET");
      if (_0x577431.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Successfully Upgrade " + _0x1d13e9, this);
        await this.getMiningStatus();
      } else {
        throw Error("Failed To Upgrade " + _0x1d13e9);
      }
    } catch (_0x5664b5) {
      this.upgradable[_0x1d13e9] = false;
      await Helper.delay(0x7d0, this.account, "Failed Upgrade " + _0x1d13e9 + " - Insufficient balance", this);
    }
  }
}
