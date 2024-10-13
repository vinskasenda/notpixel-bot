import a1_0x5b4e80 from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Helper } from '../utils/helper.js';
import a1_0x578085 from '../utils/logger.js';
export class API {
  constructor(_0x1c95a9, _0x509636, _0x57f6f9, _0x2e0c8b, _0x384d02, _0x2e2acd) {
    this.url = _0x57f6f9;
    this.host = _0x2e0c8b;
    this.origin = _0x384d02;
    this.referer = _0x2e2acd;
    this.ua = Helper.randomUserAgent();
    this.query = _0x1c95a9;
    this.proxy = _0x509636;
    this.axiosInstance = a1_0x5b4e80.create({
      'baseURL': _0x57f6f9,
      'headers': this.generateHeaders()
    });
  }
  ["generateHeaders"](_0x57d9b4 = this.query) {
    const _0x25fc9a = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': "cors",
      'User-Agent': this.ua,
      'Host': this.host,
      'Origin': this.origin,
      'Referer': this.referer
    };
    if (_0x57d9b4) {
      _0x25fc9a.Authorization = "Initdata " + _0x57d9b4;
    }
    return _0x25fc9a;
  }
  async ["fetch"](_0x52d342, _0x3529ab = "GET", _0x2e1748, _0x5a8c17 = {}, _0x1075d3 = {}) {
    try {
      const _0x3b9694 = '' + this.url + _0x52d342;
      const _0x267138 = {
        ..._0x1075d3,
        ...this.generateHeaders(_0x2e1748)
      };
      a1_0x578085.info(_0x3529ab + " : " + _0x3b9694 + " " + (this.proxy ? this.proxy : ''));
      a1_0x578085.info("Request Header : " + JSON.stringify(_0x267138));
      const _0x5db7e3 = {
        'method': _0x3529ab,
        'url': _0x3b9694,
        'headers': _0x267138
      };
      if (this.proxy) {
        _0x5db7e3.httpsAgent = new HttpsProxyAgent(this.proxy);
      }
      if (_0x3529ab !== "GET") {
        _0x5db7e3.data = _0x5a8c17;
        a1_0x578085.info("Request Body : " + JSON.stringify(_0x5a8c17));
      }
      const _0x7478a1 = await this.axiosInstance.request(_0x5db7e3);
      a1_0x578085.info("Response : " + _0x7478a1.status + " " + _0x7478a1.statusText);
      const _0xf33203 = {
        'status': _0x7478a1.status,
        ..._0x7478a1.data
      };
      a1_0x578085.info("Response Data : " + JSON.stringify(_0xf33203));
      return _0xf33203;
    } catch (_0x4fbbc4) {
      a1_0x578085.error("Error : " + _0x4fbbc4.message);
      if (_0x4fbbc4.status == 0x193) {
        return {
          'status': 0x193,
          ..._0x4fbbc4.response.data
        };
      }
      if (_0x4fbbc4.status == 0x194) {
        return {
          'status': 0x194,
          ..._0x4fbbc4.response.data
        };
      }
      throw _0x4fbbc4;
    }
  }
}