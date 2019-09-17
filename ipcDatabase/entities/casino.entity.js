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
var typeorm_1 = require("typeorm");
var CasinoEntity = /** @class */ (function () {
    function CasinoEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CasinoEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CasinoEntity.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToMany('ProviderEntity', 'casinos'),
        __metadata("design:type", Array)
    ], CasinoEntity.prototype, "providers", void 0);
    CasinoEntity = __decorate([
        typeorm_1.Entity()
    ], CasinoEntity);
    return CasinoEntity;
}());
exports.CasinoEntity = CasinoEntity;
//# sourceMappingURL=casino.entity.js.map