import { Injectable } from '@angular/core';
import { DatabaseService } from "../database/database.service";
import { SlotEntity } from '../database/entities/slot.entity';
import { Observable, BehaviorSubject } from 'rxjs';
import { removeInArrayById, findObjectInArrayById, addToArray } from '../helpers/util';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private _slots: BehaviorSubject<SlotEntity[]> = new BehaviorSubject([]);
  public readonly slots: Observable<SlotEntity[]> = this._slots.asObservable();

  constructor(
    private databaseService: DatabaseService
  ) {
    // Populate the initial _slots BehaviourSubject with data from the database
    this.databaseService.getSlotRepository().then((repo) => {
      return repo.find()
    })
    .then((slots) => {
      this._slots.next(slots);
    });
  }

  saveSlot(slot: SlotEntity): void {
    this.databaseService.getSlotRepository().then((repo) => {
      return repo.save(slot)
    })
    .then((newSlot) => {
      this._slots.next(addToArray(this._slots.getValue(), newSlot));
    });
  }

  removeSlot(slot: SlotEntity): void {
    this.databaseService.getSlotRepository().then((repo) => {
      return repo.remove(slot)
    })
    .then((removedSlot) => {
      this._slots.next(removeInArrayById(this._slots.getValue(), removedSlot.id));
    });
  }

  findSlot(id: number): SlotEntity {
    return findObjectInArrayById(this._slots.getValue(), id);
  }
}
