import { createConnection, Connection } from "typeorm";
import { CasinosManager } from "./managers/casinos.manager";
import { ProvidersManager } from "./managers/providers.manager";
import { SlotsManager } from "./managers/slots.manager";
export class DatabaseBootstrap {
  private casinosManager: CasinosManager;
  private providersManager: ProvidersManager;
  private slotsManager: SlotsManager;

  constructor() {}

  public async initialize() {
    try {
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

      this.casinosManager = new CasinosManager(connection);
      this.providersManager = new ProvidersManager(connection);
      this.slotsManager = new SlotsManager(connection);

      return null;
    } catch (err) {
      throw err;
    }
  }
}
