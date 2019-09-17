"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_entity_1 = require("./provider.entity");
var typeorm_1 = require("typeorm");
var SlotEntity = /** @class */ (function () {
    function SlotEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], SlotEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], SlotEntity.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne('ProviderEntity', 'slots'),
        __metadata("design:type", provider_entity_1.ProviderEntity)
    ], SlotEntity.prototype, "provider", void 0);
    SlotEntity = __decorate([
        typeorm_1.Entity()
    ], SlotEntity);
    return SlotEntity;
}());
exports.SlotEntity = SlotEntity;
//# sourceMappingURL=slot.entity.js.map