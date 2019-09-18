import { Connection } from "typeorm";
import { ipcMain } from "electron";
import { SlotEntity } from "../entities/slot.entity";
import { WinstonLogger } from "../../logger/WinstonLogger";

export class SlotsManager {
  private connection: Connection;
  private logger: WinstonLogger;

  constructor(connection: Connection) {
    this.logger = WinstonLogger.getInstance();
    this.connection = connection;
    this.initializeListeners();
  }

  private initializeListeners() {
    this.logger.debug('Initializing listeners for SlotManager.');
    ipcMain.on("saveSlot", (event, slot) => {
      this.saveSlot(slot).then(savedSlot => {
        event.reply("slotSaved", savedSlot);
      });
    });

    ipcMain.on("removeSlot", (event, slot) => {
      this.removeSlot(slot).then(removedSlot => {
        event.reply("slotRemoved", removedSlot);
      });
    });

    ipcMain.on("getSlots", (event, slot) => {
      this.getSlots().then(slots => {
        event.reply("slotList", slots);
      });
    });
    this.logger.debug('Listeners for SlotManager initialized.');
  }

  private async saveSlot(
    slot: SlotEntity
  ): Promise<SlotEntity | Error> {
    this.logger.debug('Saving slot to database.', slot);
    if (!this.connection)
      return new Error(
        "Could not get slots. Database is not yet initialized!"
      );
    try {
      const savedSlot = await this.connection
        .getRepository(SlotEntity)
        .save(slot);
        this.logger.debug('Slot saved.');
      return savedSlot;
    } catch (err) {
      this.logger.error('Could not save slot to database.', err);
      return new Error(
        `An error occured while trying to save the slot:\n${err}`
      );
    }
  }

  private async removeSlot(
    slot: SlotEntity
  ): Promise<SlotEntity | Error> {
    this.logger.debug('Removing slot from database.', slot);
    if (!this.connection)
      return new Error(
        "Could not get slots. Database is not yet initialized!"
      );
    try {
      const removedSlot = await this.connection
        .getRepository(SlotEntity)
        .remove(slot);
        this.logger.debug('Slot removed.');
      return removedSlot;
    } catch (err) {
      this.logger.error('Could not remove slot from database.', err);
      return new Error(
        `An error occured while trying to remove the slot:\n${err}`
      );
    }
  }

  private async getSlots(): Promise<SlotEntity[] | Error> {
    this.logger.debug('Reading all slots from database.');
    if (!this.connection)
      return new Error(
        "Could not get slots. Database is not yet initialized!"
      );
    try {
      const slots = await this.connection.getRepository(SlotEntity).find();
      this.logger.debug('All slots read from database.');
      return slots;
    } catch (err) {
      this.logger.error('Could not read all slots from database.', err);
      return new Error(
        `An error occured while trying to find all slots:\n${err}`
      );
    }
  }
}
