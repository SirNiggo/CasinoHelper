import { Component, OnInit } from '@angular/core';
import { CasinoService } from '../core/services';
import { ProviderService } from '../core/services/providers/providers.service';
import { SlotService } from '../core/services/slots/slots.service';
import { WinstonLogger } from "../../logger/WinstonLogger";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private logger: WinstonLogger;

  constructor(
    private casinoService: CasinoService,
    private providerService: ProviderService,
    private slotService: SlotService
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  ngOnInit() {

    this.casinoService.casinos.subscribe((casinos) => {
      this.logger.info('New Casinos', casinos);
    });
    this.providerService.providers.subscribe((providers) => {
      this.logger.info('New Providers', providers);
    });
    this.slotService.slots.subscribe((slots) => {
      this.logger.info('New Slots', slots);
    });

  }

}
