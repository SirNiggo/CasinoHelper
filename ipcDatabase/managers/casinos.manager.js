"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var casino_entity_1 = require("../entities/casino.entity");
var WinstonLogger_1 = require("../../logger/WinstonLogger");
var CasinosManager = /** @class */ (function () {
    function CasinosManager(connection) {
        this.logger = WinstonLogger_1.WinstonLogger.getInstance();
        this.connection = connection;
        this.initializeListeners();
    }
    CasinosManager.prototype.initializeListeners = function () {
        var _this = this;
        this.logger.debug('Initializing listeners for CasinoManager.');
        electron_1.ipcMain.on("saveCasino", function (event, casino) {
            _this.saveCasino(casino).then(function (savedCasino) {
                event.reply("casinoSaved", savedCasino);
            });
        });
        electron_1.ipcMain.on("removeCasino", function (event, casino) {
            _this.removeCasino(casino).then(function (removedCasino) {
                event.reply("casinoRemoved", removedCasino);
            });
        });
        electron_1.ipcMain.on("getCasinos", function (event, casino) {
            _this.getCasinos().then(function (casinos) {
                event.reply("casinoList", casinos);
            });
        });
        this.logger.debug('CasinoManager listeners initialized.');
    };
    CasinosManager.prototype.saveCasino = function (casino) {
        return __awaiter(this, void 0, void 0, function () {
            var savedCasino, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Saving Casino to database.', casino);
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get casinos. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection
                                .getRepository(casino_entity_1.CasinoEntity)
                                .save(casino)];
                    case 2:
                        savedCasino = _a.sent();
                        this.logger.debug('Casino saved.');
                        return [2 /*return*/, savedCasino];
                    case 3:
                        err_1 = _a.sent();
                        this.logger.debug('Failed to save casino.', err_1);
                        return [2 /*return*/, new Error("An error occured while trying to save the casino:\n" + err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CasinosManager.prototype.removeCasino = function (casino) {
        return __awaiter(this, void 0, void 0, function () {
            var removedCasino, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Removing Casino from database.', casino);
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get casinos. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection
                                .getRepository(casino_entity_1.CasinoEntity)
                                .remove(casino)];
                    case 2:
                        removedCasino = _a.sent();
                        this.logger.debug('Removed Casino.');
                        return [2 /*return*/, removedCasino];
                    case 3:
                        err_2 = _a.sent();
                        this.logger.error('Could not remove Casino.', err_2);
                        return [2 /*return*/, new Error("An error occured while trying to remove the casino:\n" + err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CasinosManager.prototype.getCasinos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var casinos, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get casinos. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.logger.debug('Trying to read all Casinos from Database.');
                        return [4 /*yield*/, this.connection.getRepository(casino_entity_1.CasinoEntity).find()];
                    case 2:
                        casinos = _a.sent();
                        this.logger.debug('Read all Casinos from Database.');
                        return [2 /*return*/, casinos];
                    case 3:
                        err_3 = _a.sent();
                        this.logger.error('Could not read all Casinos from database.', err_3);
                        return [2 /*return*/, new Error("An error occured while trying to find all casinos:\n" + err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CasinosManager;
}());
exports.CasinosManager = CasinosManager;
//# sourceMappingURL=casinos.manager.js.map