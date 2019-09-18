import { createConnection, Connection } from "typeorm";
import { CasinosManager } from "./managers/casinos.manager";
import { ProvidersManager } from "./managers/providers.manager";
import { SlotsManager } from "./managers/slots.manager";
import { WinstonLogger } from "../logger";
export class DatabaseBootstrap {
  private casinosManager: CasinosManager;
  private providersManager: ProvidersManager;
  private slotsManager: SlotsManager;
  private logger: WinstonLogger;

  constructor() {
    this.logger = WinstonLogger.getInstance();
  }

  public async initialize() {
    try {
      this.logger.debug('Trying to create database connection to local sqlite database.');
      const connection = await createConnection({
        type: "sqlite",
        database: "./data/db.sqlite",
        synchronize: true,
        logging: true,
        logger: "advanced-console",
        entities: ["./entities/**/*.entity.ts"]
        //migrations: ["src/app/core/typeorm/migrations/**/*.migration.ts"],
        //subscribers: ["src/app/core/typeorm/subscribers/**/*.subscriber.ts"]
      });

      this.logger.debug('Database connection established.');
      this.logger.debug('Initializing Database managers.');

      this.casinosManager = new CasinosManager(connection);
      this.providersManager = new ProvidersManager(connection);
      this.slotsManager = new SlotsManager(connection);

      return null;
    } catch (err) {
      this.logger.error('Failed to Bootstrap database connection.', err);
    }
  }
}
