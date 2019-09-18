"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WinstonLogger_1 = require("./WinstonLogger");
var TypeOrmLogger = /** @class */ (function () {
    function TypeOrmLogger() {
        this.logger = WinstonLogger_1.WinstonLogger.getInstance();
    }
    TypeOrmLogger.prototype.logQuery = function (query, parameters, queryRunner) {
        this.logger.debug('TypeORM Query', query, parameters);
    };
    TypeOrmLogger.prototype.logQueryError = function (error, query, parameters, queryRunner) {
        this.logger.error('TypeORM QueryError', error, query, parameters);
    };
    TypeOrmLogger.prototype.logQuerySlow = function (time, query, parameters, queryRunner) {
        this.logger.warn('TypeORM QuerySlow', time, query, parameters);
    };
    TypeOrmLogger.prototype.logSchemaBuild = function (message, queryRunner) {
        this.logger.debug('TypeORM SchemaBuild', message);
    };
    TypeOrmLogger.prototype.logMigration = function (message, queryRunner) {
        this.logger.debug('TypeORM Migration', message);
    };
    TypeOrmLogger.prototype.log = function (level, message, queryRunner) {
        switch (level) {
            case "log":
                this.logger.info('TypeOrm Log', message);
                break;
            case "info":
                this.logger.info('TypeORM Info', message);
                break;
            case "warn":
                this.logger.warn('TypeORM Warn', message);
                break;
        }
    };
    return TypeOrmLogger;
}());
exports.TypeOrmLogger = TypeOrmLogger;
//# sourceMappingURL=TypeOrmLogger.js.map