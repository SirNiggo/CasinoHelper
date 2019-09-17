import { Injectable } from '@angular/core';
import { CasinoEntity } from '../../../../../ipcDatabase/entities/casino.entity';
import { Observable, BehaviorSubject } from 'rxjs';
import { removeInArrayById, findObjectInArrayById, addToArray } from '../helpers/util';
import { ipcRenderer } from "electron";

@Injectable({
  providedIn: 'root'
})
export class CasinoService {

  private _casinos: BehaviorSubject<CasinoEntity[]> = new BehaviorSubject([]);
  public readonly casinos: Observable<CasinoEntity[]> = this._casinos.asObservable();

  constructor(
  ) {
    this.createListeners();
  }

  private createListeners() {
    // Listen to casinos collection refreshes
    ipcRenderer.on('casinoList', (event, casinos) => {
      if (casinos instanceof Error)
        throw casinos;
      this._casinos.next(casinos);
    });
    // Request the current casinos collection from main thread
    ipcRenderer.send('getCasinos');

    // React to a casinoSaved event
    ipcRenderer.on('casinoSaved', (event, savedCasino) => {
      this._casinos.next(addToArray(this._casinos.getValue(), savedCasino));
    });

    // React to a slotRemoved event
    ipcRenderer.on('casinoRemoved', (event, removedCasino) => {
      this._casinos.next(removeInArrayById(this._casinos.getValue(), removedCasino.id).newArray);
    })
  }

  saveCasino(casino: CasinoEntity): void {
    ipcRenderer.send('saveCasino', casino);
  }

  removeCasino(casino: CasinoEntity): void {
    ipcRenderer.send('removeCasino', casino);
  }

  findCasino(id: number): CasinoEntity {
    return findObjectInArrayById(this._casinos.getValue(), id);
  }
}
