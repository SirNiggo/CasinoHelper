import { Injectable } from '@angular/core';
import { DatabaseService } from "../database/database.service";
import { CasinoEntity } from '../database/entities/casino.entity';
import { Observable, BehaviorSubject } from 'rxjs';
import { removeInArrayById, findObjectInArrayById, addToArray } from '../helpers/util';

@Injectable({
  providedIn: 'root'
})
export class CasinoService {

  private _casinos: BehaviorSubject<CasinoEntity[]> = new BehaviorSubject([]);
  public readonly casinos: Observable<CasinoEntity[]> = this._casinos.asObservable();

  constructor(
    private databaseService: DatabaseService
  ) {
    // Populate the initial _casinos BehaviourSubject with data from the database
    this.databaseService.getCasinoRepository().find()
      .then((casinos) => {
        this._casinos.next(casinos);
      });
  }

  saveCasino(casino: CasinoEntity): void {
    this.databaseService.getCasinoRepository().save(casino)
      .then((newCasino) => {
        this._casinos.next(addToArray(this._casinos.getValue(), newCasino));
      });
  }

  removeCasino(casino: CasinoEntity): void {
    this.databaseService.getCasinoRepository().remove(casino)
      .then((removedCasino) => {
        this._casinos.next(removeInArrayById(this._casinos.getValue(), removedCasino.id));
      });
  }

  findCasino(id: number): CasinoEntity {
    return findObjectInArrayById(this._casinos.getValue(), id);
  }
}
