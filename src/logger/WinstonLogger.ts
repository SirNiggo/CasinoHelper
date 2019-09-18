import { Logger, createLogger, config, transports, format } from "winston";
import * as moment from "moment";

export class WinstonLogger {

  private _winstonInstance: Logger;
  private static instance: WinstonLogger;

  private constructor() {

    this._winstonInstance = createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.align(),
            format.printf((info) => {
              const {
                timestamp, level, message, ...args
              } = info;
              const ts = moment(timestamp).format('DD.MM.YYYY HH:mm:ss.SSS Z');
              return `(${ts}) [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
            })
          ),
          level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug'
        })
      ]
    });

  }

  static getInstance() {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger();
    }
    return WinstonLogger.instance;
  }

  public debug(msg: string, ...context: any[]) {
    this._winstonInstance.debug(msg, context);
  }

  public silly(msg: string, ...context: any[]) {
    this._winstonInstance.silly(msg, context);
  }

  public info(msg: string, ...context: any[]) {
    this._winstonInstance.info(msg, context);
  }

  public warn(msg: string, ...context: any[]) {
    this._winstonInstance.warn(msg, context);
  }

  public error(msg: string, ...context: any[]) {
    this._winstonInstance.error(msg, context);
  }

}
