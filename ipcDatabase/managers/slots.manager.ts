import { Connection } from "typeorm";
import { ipcMain } from "electron";
import { SlotEntity } from "../entities/slot.entity";

export class SlotsManager {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
    this.initializeListeners();
  }

  private initializeListeners() {
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
  }

  private async saveSlot(
    slot: SlotEntity
  ): Promise<SlotEntity | Error> {
    if (!this.connection)
      return new Error(
        "Could not get slots. Database is not yet initialized!"
      );
    try {
      const savedSlot = await this.connection
        .getRepository(SlotEntity)
        .save(slot);
      return savedSlot;
    } catch (err) {
      return new Error(
        `An error occured while trying to save the slot:\n${err}`
      );
    }
  }

  private async removeSlot(
    slot: SlotEntity
  ): Promise<SlotEntity | Error> {
    if (!this.connection)
      return new Error(
        "Could not get slots. Database is not yet initialized!"
      );
    try {
      const removedSlot = await this.connection
        .getRepository(SlotEntity)
        .remove(slot);
      return removedSlot;
    } catch (err) {
      return new Error(
        `An error occured while trying to remove the slot:\n${err}`
      );
    }
  }

  private async getSlots(): Promise<SlotEntity[] | Error> {
    if (!this.connection)
      return new Error(
        "Could not get slots. Database is not yet initialized!"
      );
    try {
      const slots = await this.connection.getRepository(SlotEntity).find();
      return slots;
    } catch (err) {
      return new Error(
        `An error occured while trying to find all slots:\n${err}`
      );
    }
  }
}
