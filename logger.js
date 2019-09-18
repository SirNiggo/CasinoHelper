"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var moment = require("moment");
var WinstonLogger = /** @class */ (function () {
    function WinstonLogger() {
        this._winstonInstance = winston_1.createLogger({
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.align(), winston_1.format.printf(function (info) {
                        var timestamp = info.timestamp, level = info.level, message = info.message, args = __rest(info, ["timestamp", "level", "message"]);
                        var ts = moment(timestamp).format('DD.MM.YYYY HH:mm:ss.SSS Z');
                        return "(" + ts + ") [" + level + "]: " + message + " " + (Object.keys(args).length ? JSON.stringify(args, null, 2) : '');
                    })),
                    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug'
                })
            ]
        });
    }
    WinstonLogger.getInstance = function () {
        if (!WinstonLogger.instance) {
            WinstonLogger.instance = new WinstonLogger();
        }
        return WinstonLogger.instance;
    };
    WinstonLogger.prototype.log = function (msg, context) {
        this._winstonInstance.log(msg, context);
    };
    WinstonLogger.prototype.debug = function (msg, context) {
        this._winstonInstance.debug(msg, context);
    };
    WinstonLogger.prototype.silly = function (msg, context) {
        this._winstonInstance.silly(msg, context);
    };
    WinstonLogger.prototype.info = function (msg, context) {
        this._winstonInstance.info(msg, context);
    };
    WinstonLogger.prototype.warn = function (msg, context) {
        this._winstonInstance.warn(msg, context);
    };
    WinstonLogger.prototype.error = function (msg, context) {
        this._winstonInstance.error(msg, context);
    };
    return WinstonLogger;
}());
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=logger.js.map