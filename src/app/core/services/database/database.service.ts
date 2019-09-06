import { Injectable } from "@angular/core";
import { Connection, createConnection, Repository } from "typeorm";
import { CasinoEntity } from "./entities/casino.entity";
import { ProviderEntity } from "./entities/provider.entity";
import { SlotEntity } from "./entities/slot.entity";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  public connection: Connection;

  constructor() {
    createConnection({
      type: "sqlite",
      database: "./data/db.sqlite",
      synchronize: true,
      logging: true,
      logger: "advanced-console",
      entities: ["./entities/**/*.entity.ts"]
      //migrations: ["src/app/core/typeorm/migrations/**/*.migration.ts"],
      //subscribers: ["src/app/core/typeorm/subscribers/**/*.subscriber.ts"]
    })
      .then(con => {
        console.log(`Database successfully initialized.`);
        this.connection = con;
      })
      .catch(err => {
        throw new Error(
          `An error occured while trying to initalize the database connection:\n${err}`
        );
      });
  }

  getCasinoRepository(): Repository<CasinoEntity> {
    if (this.connection === null) {
      throw new Error(`Can not create a repository when the connection is not initialized!`);
    }
    return this.connection.getRepository(CasinoEntity);
  }

  getProviderRepository(): Repository<ProviderEntity> {
    if (this.connection === null) {
      throw new Error(`Can not create a repository when the connection is not initialized!`);
    }
    return this.connection.getRepository(ProviderEntity);
  }

  getSlotRepository(): Repository<SlotEntity> {
    if (this.connection === null) {
      throw new Error(`Can not create a repository when the connection is not initialized!`);
    }
    return this.connection.getRepository(SlotEntity);
  }
}
