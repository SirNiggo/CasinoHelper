import { Injectable } from "@angular/core";
import { Connection, createConnection, Repository } from "typeorm";
import { CasinoEntity } from "./entities/casino.entity";
import { ProviderEntity } from "./entities/provider.entity";
import { SlotEntity } from "./entities/slot.entity";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  public connection: Promise<Connection> = null;

  constructor() {
    this.connection = createConnection({
      type: "sqlite",
      database: "./data/db.sqlite",
      synchronize: true,
      logging: true,
      logger: "advanced-console",
      entities: ["./entities/**/*.entity.ts"]
      //migrations: ["src/app/core/typeorm/migrations/**/*.migration.ts"],
      //subscribers: ["src/app/core/typeorm/subscribers/**/*.subscriber.ts"]
    });
  }

  async getCasinoRepository(): Promise<Repository<CasinoEntity>> {
    const con = await this.connection;
    return con.getRepository(CasinoEntity);
  }

  async getProviderRepository(): Promise<Repository<ProviderEntity>> {
    const con = await this.connection;
    return con.getRepository(ProviderEntity);
  }

  async getSlotRepository(): Promise<Repository<SlotEntity>> {
    const con = await this.connection;
    return con.getRepository(SlotEntity);
  }
}
