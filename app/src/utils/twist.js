import { Twisters } from 'twisters';
import a6_0x54d76a from './logger.js';
import { Core } from '../core/core.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x4366fe = '', _0x432616 = '', _0xe10c00 = new Core(), _0x1cfa93) {
    if (_0x1cfa93 == undefined) {
      a6_0x54d76a.info(_0x432616.id + " - " + _0x4366fe);
      _0x1cfa93 = '-';
    }
    const _0x162910 = _0xe10c00.mining ?? {};
    const _0x1df5fc = _0x162910.userBalance ?? '-';
    const _0x346c3e = _0x162910.charges ?? '-';
    this.twisters.put(_0x432616.id, {
      'text': "\n================= Account " + _0x432616.id + " =============\nName         : " + (_0x432616.firstName ?? 'Unamed') + " " + (_0x432616.lastName ?? '') + " \nBalance      : " + _0x1df5fc + "\nCharge       : " + _0x346c3e + "\n\nStatus : " + _0x4366fe + "\nDelay : " + _0x1cfa93 + "\n=============================================="
    });
  }
  ["info"](_0x3227b0 = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x3227b0 + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  async ["clear"](_0x784a20) {
    await this.twisters.flush();
  }
}
export default new Twist();