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
var provider_entity_1 = require("../entities/provider.entity");
var WinstonLogger_1 = require("../../logger/WinstonLogger");
var ProvidersManager = /** @class */ (function () {
    function ProvidersManager(connection) {
        this.logger = WinstonLogger_1.WinstonLogger.getInstance();
        this.connection = connection;
        this.initializeListeners();
    }
    ProvidersManager.prototype.initializeListeners = function () {
        var _this = this;
        this.logger.debug('Initializing listeners for ProviderManager.');
        electron_1.ipcMain.on("saveProvider", function (event, provider) {
            _this.saveProvider(provider).then(function (savedProvider) {
                event.reply("providerSaved", savedProvider);
            });
        });
        electron_1.ipcMain.on("removeProvider", function (event, provider) {
            _this.removeProvider(provider).then(function (removedProvider) {
                event.reply("providerRemoved", removedProvider);
            });
        });
        electron_1.ipcMain.on("getProviders", function (event, provider) {
            _this.getProviders().then(function (providers) {
                event.reply("providerList", providers);
            });
        });
        this.logger.debug('ProviderManager listeners initialized.');
    };
    ProvidersManager.prototype.saveProvider = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var savedProvider, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Saving provider to database.', provider);
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get providers. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection
                                .getRepository(provider_entity_1.ProviderEntity)
                                .save(provider)];
                    case 2:
                        savedProvider = _a.sent();
                        this.logger.debug('Provider saved to database.');
                        return [2 /*return*/, savedProvider];
                    case 3:
                        err_1 = _a.sent();
                        this.logger.error('Could not save provider to database.', err_1);
                        return [2 /*return*/, new Error("An error occured while trying to save the provider:\n" + err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProvidersManager.prototype.removeProvider = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var removedProvider, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Removing provider from database.', provider);
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get providers. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection
                                .getRepository(provider_entity_1.ProviderEntity)
                                .remove(provider)];
                    case 2:
                        removedProvider = _a.sent();
                        this.logger.debug('Provider removed from database.');
                        return [2 /*return*/, removedProvider];
                    case 3:
                        err_2 = _a.sent();
                        this.logger.error('Could not remove provider from database.', err_2);
                        return [2 /*return*/, new Error("An error occured while trying to remove the provider:\n" + err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProvidersManager.prototype.getProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var providers, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Trying to read all providers from database.');
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get providers. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection.getRepository(provider_entity_1.ProviderEntity).find()];
                    case 2:
                        providers = _a.sent();
                        this.logger.debug('Read all providers from database.');
                        return [2 /*return*/, providers];
                    case 3:
                        err_3 = _a.sent();
                        this.logger.error('Could not read all providers from database.', err_3);
                        return [2 /*return*/, new Error("An error occured while trying to find all providers:\n" + err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProvidersManager;
}());
exports.ProvidersManager = ProvidersManager;
//# sourceMappingURL=providers.manager.js.map