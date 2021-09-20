import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsOverviewComponent } from './charts-overview/charts-overview.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    ChartsOverviewComponent,
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    FlexLayoutModule,
    NgxChartsModule,
  ]
})
export class ChartsModule { }
