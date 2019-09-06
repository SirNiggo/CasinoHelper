import { Injectable } from '@angular/core';
import { DatabaseService } from "../database/database.service";
import { ProviderEntity } from '../database/entities/provider.entity';
import { Observable, BehaviorSubject } from 'rxjs';
import { removeInArrayById, findObjectInArrayById, addToArray } from '../helpers/util';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private _providers: BehaviorSubject<ProviderEntity[]> = new BehaviorSubject([]);
  public readonly providers: Observable<ProviderEntity[]> = this._providers.asObservable();

  constructor(
    private databaseService: DatabaseService
  ) {
    // Populate the initial _providers BehaviourSubject with data from the database
    this.databaseService.getProviderRepository().find()
      .then((providers) => {
        this._providers.next(providers);
      });
  }

  saveProvider(provider: ProviderEntity): void {
    this.databaseService.getProviderRepository().save(provider)
      .then((newProvider) => {
        this._providers.next(addToArray(this._providers.getValue(), newProvider));
      });
  }

  removeProvider(provider: ProviderEntity): void {
    this.databaseService.getProviderRepository().remove(provider)
      .then((removedProvider) => {
        this._providers.next(removeInArrayById(this._providers.getValue(), removedProvider.id));
      });
  }

  findProvider(id: number): ProviderEntity {
    return findObjectInArrayById(this._providers.getValue(), id);
  }
}
