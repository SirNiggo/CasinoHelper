import { Injectable } from '@angular/core';
import { ProviderEntity } from '../../../../ipcDatabase/entities/provider.entity';
import { Observable, BehaviorSubject } from 'rxjs';
import { removeInArrayById, findObjectInArrayById, addToArray } from '../helpers/util';
import { ipcRenderer } from "electron";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private _providers: BehaviorSubject<ProviderEntity[]> = new BehaviorSubject([]);
  public readonly providers: Observable<ProviderEntity[]> = this._providers.asObservable();

  constructor(
  ) {
    this.createListeners();
  }

  private createListeners() {
    // Listen to providers collection refreshes
    ipcRenderer.on('providerList', (event, providers) => {
      if (providers instanceof Error)
        throw providers;
      this._providers.next(providers);
    });
    // Request the current providers collection from main thread
    ipcRenderer.send('getProviders');

    // React to a providerSaved event
    ipcRenderer.on('providerSaved', (event, savedProvider) => {
      this._providers.next(addToArray(this._providers.getValue(), savedProvider));
    });

    // React to a slotRemoved event
    ipcRenderer.on('providerRemoved', (event, removedProvider) => {
      this._providers.next(removeInArrayById(this._providers.getValue(), removedProvider.id).newArray);
    })
  }

  saveProvider(provider: ProviderEntity): void {
    ipcRenderer.send('saveProvider', provider);
  }

  removeProvider(provider: ProviderEntity): void {
    ipcRenderer.send('removeProvider', provider);
  }

  findProvider(id: number): ProviderEntity {
    return findObjectInArrayById(this._providers.getValue(), id);
  }
}
