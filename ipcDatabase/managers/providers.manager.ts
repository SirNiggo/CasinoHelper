import { Connection } from "typeorm";
import { ipcMain } from "electron";
import { ProviderEntity } from "../entities/provider.entity";
import { WinstonLogger } from "../../logger/WinstonLogger";

export class ProvidersManager {
  private connection: Connection;
  private logger: WinstonLogger;

  constructor(connection: Connection) {
    this.logger = WinstonLogger.getInstance();
    this.connection = connection;
    this.initializeListeners();
  }

  private initializeListeners() {
    this.logger.debug('Initializing listeners for ProviderManager.');
    ipcMain.on("saveProvider", (event, provider) => {
      this.saveProvider(provider).then(savedProvider => {
        event.reply("providerSaved", savedProvider);
      });
    });

    ipcMain.on("removeProvider", (event, provider) => {
      this.removeProvider(provider).then(removedProvider => {
        event.reply("providerRemoved", removedProvider);
      });
    });

    ipcMain.on("getProviders", (event, provider) => {
      this.getProviders().then(providers => {
        event.reply("providerList", providers);
      });
    });
    this.logger.debug('ProviderManager listeners initialized.');
  }

  private async saveProvider(
    provider: ProviderEntity
  ): Promise<ProviderEntity | Error> {
    this.logger.debug('Saving provider to database.', provider);
    if (!this.connection)
      return new Error(
        "Could not get providers. Database is not yet initialized!"
      );
    try {
      const savedProvider = await this.connection
        .getRepository(ProviderEntity)
        .save(provider);
        this.logger.debug('Provider saved to database.');
      return savedProvider;
    } catch (err) {
      this.logger.error('Could not save provider to database.', err);
      return new Error(
        `An error occured while trying to save the provider:\n${err}`
      );
    }
  }

  private async removeProvider(
    provider: ProviderEntity
  ): Promise<ProviderEntity | Error> {
    this.logger.debug('Removing provider from database.', provider);
    if (!this.connection)
      return new Error(
        "Could not get providers. Database is not yet initialized!"
      );
    try {
      const removedProvider = await this.connection
        .getRepository(ProviderEntity)
        .remove(provider);
        this.logger.debug('Provider removed from database.');
      return removedProvider;
    } catch (err) {
      this.logger.error('Could not remove provider from database.', err);
      return new Error(
        `An error occured while trying to remove the provider:\n${err}`
      );
    }
  }

  private async getProviders(): Promise<ProviderEntity[] | Error> {
    this.logger.debug('Trying to read all providers from database.');
    if (!this.connection)
      return new Error(
        "Could not get providers. Database is not yet initialized!"
      );
    try {
      const providers = await this.connection.getRepository(ProviderEntity).find();
      this.logger.debug('Read all providers from database.');
      return providers;
    } catch (err) {
      this.logger.error('Could not read all providers from database.', err);
      return new Error(
        `An error occured while trying to find all providers:\n${err}`
      );
    }
  }
}
