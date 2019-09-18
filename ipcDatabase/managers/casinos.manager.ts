import { Connection } from "typeorm";
import { ipcMain } from "electron";
import { CasinoEntity } from "../entities/casino.entity";
import { WinstonLogger } from "../../logger";

export class CasinosManager {
  private connection: Connection;
  private logger: WinstonLogger;

  constructor(connection: Connection) {
    this.logger = WinstonLogger.getInstance();
    this.connection = connection;
    this.initializeListeners();
  }

  private initializeListeners() {
    this.logger.debug('Initializing listeners for CasinoManager.');
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
    this.logger.debug('CasinoManager listeners initialized.');
  }

  private async saveCasino(
    casino: CasinoEntity
  ): Promise<CasinoEntity | Error> {
    this.logger.debug('Saving Casino to database.', casino);
    if (!this.connection)
      return new Error(
        "Could not get casinos. Database is not yet initialized!"
      );
    try {
      const savedCasino = await this.connection
        .getRepository(CasinoEntity)
        .save(casino);
      this.logger.debug('Casino saved.');
      return savedCasino;
    } catch (err) {
      this.logger.debug('Failed to save casino.', err);
      return new Error(
        `An error occured while trying to save the casino:\n${err}`
      );
    }
  }

  private async removeCasino(
    casino: CasinoEntity
  ): Promise<CasinoEntity | Error> {
    this.logger.debug('Removing Casino from database.', casino);
    if (!this.connection)
      return new Error(
        "Could not get casinos. Database is not yet initialized!"
      );
    try {
      const removedCasino = await this.connection
        .getRepository(CasinoEntity)
        .remove(casino);
        this.logger.debug('Removed Casino.');
      return removedCasino;
    } catch (err) {
      this.logger.error('Could not remove Casino.', err);
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
      this.logger.debug('Trying to read all Casinos from Database.');
      const casinos = await this.connection.getRepository(CasinoEntity).find();
      this.logger.debug('Read all Casinos from Database.');
      return casinos;
    } catch (err) {
      this.logger.error('Could not read all Casinos from database.', err);
      return new Error(
        `An error occured while trying to find all casinos:\n${err}`
      );
    }
  }
}
