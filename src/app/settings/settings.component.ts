import { Component, OnInit } from '@angular/core';
import { CasinoService } from '../core/services';
import { ProviderService } from '../core/services/providers/providers.service';
import { SlotService } from '../core/services/slots/slots.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private casinoService: CasinoService,
    private providerService: ProviderService,
    private slotService: SlotService
  ) { }

  ngOnInit() {

    console.log(this.casinoService.casinos);
    console.log(this.providerService.providers);
    console.log(this.slotService.slots);

  }

}
