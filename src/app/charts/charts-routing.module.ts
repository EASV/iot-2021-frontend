import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChartsOverviewComponent} from './charts-overview/charts-overview.component';

const routes: Routes = [{
  path: '', component: ChartsOverviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
