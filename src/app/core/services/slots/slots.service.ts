import { Injectable } from '@angular/core';
import { SlotEntity } from '../../../../../ipcDatabase/entities/slot.entity';
import { Observable, BehaviorSubject } from 'rxjs';
import { removeInArrayById, findObjectInArrayById, addToArray } from '../helpers/util';
import { ipcRenderer } from "electron";

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private _slots: BehaviorSubject<SlotEntity[]> = new BehaviorSubject([]);
  public readonly slots: Observable<SlotEntity[]> = this._slots.asObservable();

  constructor(
  ) {
    this.createListeners();
  }

  private createListeners() {
    // Listen to slots collection refreshes
    ipcRenderer.on('slotList', (event, slots) => {
      if (slots instanceof Error)
        throw slots;
      this._slots.next(slots);
    });
    // Request the current slots collection from main thread
    ipcRenderer.send('getSlots');

    // React to a slotSaved event
    ipcRenderer.on('slotSaved', (event, savedSlot) => {
      this._slots.next(addToArray(this._slots.getValue(), savedSlot));
    });

    // React to a slotRemoved event
    ipcRenderer.on('slotRemoved', (event, removedSlot) => {
      this._slots.next(removeInArrayById(this._slots.getValue(), removedSlot.id).newArray);
    })
  }

  saveSlot(slot: SlotEntity): void {
    ipcRenderer.send('saveSlot', slot);
  }

  removeSlot(slot: SlotEntity): void {
    ipcRenderer.send('removeSlot', slot);
  }

  findSlot(id: number): SlotEntity {
    return findObjectInArrayById(this._slots.getValue(), id);
  }
}
