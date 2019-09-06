import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';

// Material Components
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material";

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SharedModule, SettingsRoutingModule, MatDatepickerModule, MatInputModule, MatFormFieldModule]
})
export class SettingsModule {}
