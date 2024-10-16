import { Twisters } from 'twisters';
import a6_0x27666d from './logger.js';
import { Core } from '../core/core.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x546d8f = '', _0x5e586a = '', _0x45cdc3 = new Core(), _0x22765b) {
    if (_0x22765b == undefined) {
      a6_0x27666d.info(_0x5e586a.id + " - " + _0x546d8f);
      _0x22765b = '-';
    }
    const _0x55416c = _0x45cdc3.mining ?? {};
    const _0x590a69 = _0x55416c.userBalance ?? '-';
    const _0x255a50 = _0x55416c.charges ?? '-';
    this.twisters.put(_0x5e586a.id, {
      'text': "\n================= Account " + _0x5e586a.id + " =============\nName         : " + (_0x5e586a.firstName ?? "Unamed") + " " + (_0x5e586a.lastName ?? '') + " \nBalance      : " + _0x590a69 + "\nCharge       : " + _0x255a50 + "\n\nStatus : " + _0x546d8f + "\nDelay : " + _0x22765b + "\n=============================================="
    });
  }
  ["info"](_0x113347 = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x113347 + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  async ["clear"](_0x12b76b) {
    await this.twisters.flush();
  }
}
export default new Twist();
