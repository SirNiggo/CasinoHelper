import { Connection } from "typeorm";
import { ipcMain } from "electron";
import { ProviderEntity } from "../entities/provider.entity";

export class ProvidersManager {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
    this.initializeListeners();
  }

  private initializeListeners() {
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
  }

  private async saveProvider(
    provider: ProviderEntity
  ): Promise<ProviderEntity | Error> {
    if (!this.connection)
      return new Error(
        "Could not get providers. Database is not yet initialized!"
      );
    try {
      const savedProvider = await this.connection
        .getRepository(ProviderEntity)
        .save(provider);
      return savedProvider;
    } catch (err) {
      return new Error(
        `An error occured while trying to save the provider:\n${err}`
      );
    }
  }

  private async removeProvider(
    provider: ProviderEntity
  ): Promise<ProviderEntity | Error> {
    if (!this.connection)
      return new Error(
        "Could not get providers. Database is not yet initialized!"
      );
    try {
      const removedProvider = await this.connection
        .getRepository(ProviderEntity)
        .remove(provider);
      return removedProvider;
    } catch (err) {
      return new Error(
        `An error occured while trying to remove the provider:\n${err}`
      );
    }
  }

  private async getProviders(): Promise<ProviderEntity[] | Error> {
    if (!this.connection)
      return new Error(
        "Could not get providers. Database is not yet initialized!"
      );
    try {
      const providers = await this.connection.getRepository(ProviderEntity).find();
      return providers;
    } catch (err) {
      return new Error(
        `An error occured while trying to find all providers:\n${err}`
      );
    }
  }
}
