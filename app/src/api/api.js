import a1_0x58814f from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Helper } from '../utils/helper.js';
import a1_0x75a729 from '../utils/logger.js';
export class API {
  constructor(_0x371ac7, _0xb04b6e, _0x3ed4e8, _0x18106d, _0x1d04d7, _0x1c2733) {
    this.url = _0x3ed4e8;
    this.host = _0x18106d;
    this.origin = _0x1d04d7;
    this.referer = _0x1c2733;
    this.ua = Helper.randomUserAgent();
    this.query = _0x371ac7;
    this.proxy = _0xb04b6e;
    this.axiosInstance = a1_0x58814f.create({
      'baseURL': _0x3ed4e8,
      'headers': this.generateHeaders()
    });
  }
  ["generateHeaders"](_0x11d649 = this.query) {
    const _0x1c8784 = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Content-Type': 'application/json',
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': 'cors',
      'User-Agent': this.ua,
      'Host': this.host,
      'Origin': this.origin,
      'Referer': this.referer
    };
    if (_0x11d649) {
      _0x1c8784.Authorization = "Initdata " + _0x11d649;
    }
    return _0x1c8784;
  }
  async ['fetch'](_0x2fd811, _0x29e2a4 = "GET", _0x3884dc, _0x17e0ef = {}, _0x31e9de = {}) {
    try {
      const _0x59296b = '' + this.url + _0x2fd811;
      const _0x19f463 = {
        ..._0x31e9de,
        ...this.generateHeaders(_0x3884dc)
      };
      a1_0x75a729.info(_0x29e2a4 + " : " + _0x59296b + " " + (this.proxy ? this.proxy : ''));
      a1_0x75a729.info("Request Header : " + JSON.stringify(_0x19f463));
      const _0x35966b = {
        'method': _0x29e2a4,
        'url': _0x59296b,
        'headers': _0x19f463
      };
      if (this.proxy) {
        _0x35966b.httpsAgent = new HttpsProxyAgent(this.proxy);
      }
      if (_0x29e2a4 !== "GET") {
        _0x35966b.data = _0x17e0ef;
        a1_0x75a729.info("Request Body : " + JSON.stringify(_0x17e0ef));
      }
      const _0x3f429b = await this.axiosInstance.request(_0x35966b);
      a1_0x75a729.info("Response : " + _0x3f429b.status + " " + _0x3f429b.statusText);
      const _0x360b1f = {
        'status': _0x3f429b.status,
        ..._0x3f429b.data
      };
      a1_0x75a729.info("Response Data : " + JSON.stringify(_0x360b1f));
      return _0x360b1f;
    } catch (_0x197f1f) {
      a1_0x75a729.error("Error : " + _0x197f1f.message);
      if (_0x197f1f.status == 0x193) {
        return {
          'status': 0x193,
          ..._0x197f1f.response.data
        };
      }
      if (_0x197f1f.status == 0x194) {
        return {
          'status': 0x194,
          ..._0x197f1f.response.data
        };
      }
      throw _0x197f1f;
    }
  }
}
