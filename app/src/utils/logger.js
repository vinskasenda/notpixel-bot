import { createLogger, format, transports } from 'winston';
import a5_0x226161 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0xbbb8b2,
  message: _0xa6c61b,
  timestamp: _0x4e1606
}) => {
  return _0x4e1606 + " [" + _0xbbb8b2 + "]: " + _0xa6c61b;
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
  ["info"](_0x38ba1a) {
    this.logger.info(_0x38ba1a);
  }
  ["warn"](_0x3665d3) {
    this.logger.warn(_0x3665d3);
  }
  ["error"](_0x25d6a5) {
    this.logger.error(_0x25d6a5);
  }
  ["debug"](_0x58416e) {
    this.logger.debug(_0x58416e);
  }
  ["setLevel"](_0x6f1b3) {
    this.logger.level = _0x6f1b3;
  }
  ["clear"]() {
    a5_0x226161.truncate("log/app.log", 0x0, _0x18754d => {
      if (_0x18754d) {
        this.logger.error("Failed to clear the log file: " + _0x18754d.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
