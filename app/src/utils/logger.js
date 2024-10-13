import { createLogger, format, transports } from 'winston';
import a5_0x4bd05f from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x26bef4,
  message: _0x361b1c,
  timestamp: _0x3620ab
}) => {
  return _0x3620ab + " [" + _0x26bef4 + "]: " + _0x361b1c;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': "log/app.log"
      })]
    });
  }
  ["info"](_0x2e9745) {
    this.logger.info(_0x2e9745);
  }
  ["warn"](_0x2a0081) {
    this.logger.warn(_0x2a0081);
  }
  ["error"](_0x93fbc3) {
    this.logger.error(_0x93fbc3);
  }
  ["debug"](_0x230b98) {
    this.logger.debug(_0x230b98);
  }
  ["setLevel"](_0x2e2893) {
    this.logger.level = _0x2e2893;
  }
  ['clear']() {
    a5_0x4bd05f.truncate("log/app.log", 0x0, _0x279b71 => {
      if (_0x279b71) {
        this.logger.error("Failed to clear the log file: " + _0x279b71.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();