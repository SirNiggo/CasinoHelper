import { Connection } from "typeorm";
import { ipcMain } from "electron";
import { CasinoEntity } from "../entities/casino.entity";

export class CasinosManager {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
    this.initializeListeners();
  }

  private initializeListeners() {
    ipcMain.on("saveCasino", (event, casino) => {
      this.saveCasino(casino).then(savedCasino => {
        event.reply("casinoSaved", savedCasino);
      });
    });

    ipcMain.on("removeCasino", (event, casino) => {
      this.removeCasino(casino).then(removedCasino => {
        event.reply("casinoRemoved", removedCasino);
      });
    });

    ipcMain.on("getCasinos", (event, casino) => {
      this.getCasinos().then(casinos => {
        event.reply("casinoList", casinos);
      });
    });
  }

  private async saveCasino(
    casino: CasinoEntity
  ): Promise<CasinoEntity | Error> {
    if (!this.connection)
      return new Error(
        "Could not get casinos. Database is not yet initialized!"
      );
    try {
      const savedCasino = await this.connection
        .getRepository(CasinoEntity)
        .save(casino);
      return savedCasino;
    } catch (err) {
      return new Error(
        `An error occured while trying to save the casino:\n${err}`
      );
    }
  }

  private async removeCasino(
    casino: CasinoEntity
  ): Promise<CasinoEntity | Error> {
    if (!this.connection)
      return new Error(
        "Could not get casinos. Database is not yet initialized!"
      );
    try {
      const removedCasino = await this.connection
        .getRepository(CasinoEntity)
        .remove(casino);
      return removedCasino;
    } catch (err) {
      return new Error(
        `An error occured while trying to remove the casino:\n${err}`
      );
    }
  }

  private async getCasinos(): Promise<CasinoEntity[] | Error> {
    if (!this.connection)
      return new Error(
        "Could not get casinos. Database is not yet initialized!"
      );
    try {
      const casinos = await this.connection.getRepository(CasinoEntity).find();
      return casinos;
    } catch (err) {
      return new Error(
        `An error occured while trying to find all casinos:\n${err}`
      );
    }
  }
}
