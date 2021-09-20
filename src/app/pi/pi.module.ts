import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PiRoutingModule } from './pi-routing.module';
import { PiOverviewComponent } from './pi-overview/pi-overview.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    PiOverviewComponent
  ],
  imports: [
    CommonModule,
    PiRoutingModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
  ]
})
export class PiModule { }
