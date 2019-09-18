import { Logger, QueryRunner } from "typeorm";
import { WinstonLogger } from "./WinstonLogger";

export class TypeOrmLogger implements Logger {

  private logger: WinstonLogger;

  constructor() {
    this.logger = WinstonLogger.getInstance();
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.debug('TypeORM Query', query, parameters);
  }
  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.error('TypeORM QueryError', error, query, parameters);
  }
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.warn('TypeORM QuerySlow', time, query, parameters);
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.debug('TypeORM SchemaBuild', message);
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.debug('TypeORM Migration', message);
  }
  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    switch(level) {
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
  }
}
