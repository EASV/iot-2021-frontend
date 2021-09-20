import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PiOverviewComponent} from './pi-overview/pi-overview.component';

const routes: Routes = [{
  path: '', component: PiOverviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PiRoutingModule { }
