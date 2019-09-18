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
var slot_entity_1 = require("../entities/slot.entity");
var logger_1 = require("../../logger");
var SlotsManager = /** @class */ (function () {
    function SlotsManager(connection) {
        this.logger = logger_1.WinstonLogger.getInstance();
        this.connection = connection;
        this.initializeListeners();
    }
    SlotsManager.prototype.initializeListeners = function () {
        var _this = this;
        this.logger.debug('Initializing listeners for SlotManager.');
        electron_1.ipcMain.on("saveSlot", function (event, slot) {
            _this.saveSlot(slot).then(function (savedSlot) {
                event.reply("slotSaved", savedSlot);
            });
        });
        electron_1.ipcMain.on("removeSlot", function (event, slot) {
            _this.removeSlot(slot).then(function (removedSlot) {
                event.reply("slotRemoved", removedSlot);
            });
        });
        electron_1.ipcMain.on("getSlots", function (event, slot) {
            _this.getSlots().then(function (slots) {
                event.reply("slotList", slots);
            });
        });
        this.logger.debug('Listeners for SlotManager initialized.');
    };
    SlotsManager.prototype.saveSlot = function (slot) {
        return __awaiter(this, void 0, void 0, function () {
            var savedSlot, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Saving slot to database.', slot);
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get slots. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection
                                .getRepository(slot_entity_1.SlotEntity)
                                .save(slot)];
                    case 2:
                        savedSlot = _a.sent();
                        this.logger.debug('Slot saved.');
                        return [2 /*return*/, savedSlot];
                    case 3:
                        err_1 = _a.sent();
                        this.logger.error('Could not save slot to database.', err_1);
                        return [2 /*return*/, new Error("An error occured while trying to save the slot:\n" + err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SlotsManager.prototype.removeSlot = function (slot) {
        return __awaiter(this, void 0, void 0, function () {
            var removedSlot, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Removing slot from database.', slot);
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get slots. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection
                                .getRepository(slot_entity_1.SlotEntity)
                                .remove(slot)];
                    case 2:
                        removedSlot = _a.sent();
                        this.logger.debug('Slot removed.');
                        return [2 /*return*/, removedSlot];
                    case 3:
                        err_2 = _a.sent();
                        this.logger.error('Could not remove slot from database.', err_2);
                        return [2 /*return*/, new Error("An error occured while trying to remove the slot:\n" + err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SlotsManager.prototype.getSlots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var slots, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Reading all slots from database.');
                        if (!this.connection)
                            return [2 /*return*/, new Error("Could not get slots. Database is not yet initialized!")];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connection.getRepository(slot_entity_1.SlotEntity).find()];
                    case 2:
                        slots = _a.sent();
                        this.logger.debug('All slots read from database.');
                        return [2 /*return*/, slots];
                    case 3:
                        err_3 = _a.sent();
                        this.logger.error('Could not read all slots from database.', err_3);
                        return [2 /*return*/, new Error("An error occured while trying to find all slots:\n" + err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SlotsManager;
}());
exports.SlotsManager = SlotsManager;
//# sourceMappingURL=slots.manager.js.map