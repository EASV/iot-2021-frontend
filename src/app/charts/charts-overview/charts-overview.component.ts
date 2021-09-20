import {Component, OnDestroy, OnInit} from '@angular/core';
import {TemperatureService} from '../../pi/shared/temperature.service';
import {environment} from '../../../environments/environment';
import {DataSeries} from './shared/data-series';
import {Color} from '@swimlane/ngx-charts/lib/utils/color-sets';
import {ScaleType} from '@swimlane/ngx-charts';
import {HumidityService} from '../../pi/shared/humidity.service';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-charts-overview',
  templateUrl: './charts-overview.component.html',
  styleUrls: ['./charts-overview.component.scss']
})
export class ChartsOverviewComponent implements OnInit, OnDestroy {

  notifier$ = new Subject();
  series: DataSeries[] | undefined;
  seriesHumidity: DataSeries[] | undefined;

  // optionsTemperature
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Temperature';
  timeline: boolean = true;

  // optionsHumidity
  legendHumidity: boolean = true;
  xAxisHumidity: boolean = true;
  yAxisHumidity: boolean = true;
  showYAxisLabelHumidity: boolean = true;
  showXAxisLabelHumidity: boolean = true;
  xAxisLabelHumidity: string = 'Time';
  yAxisLabelHumidity: string = 'Humidity';
  timelineHumidity: boolean = true;

  colorScheme: string | Color = {
    name: 'blue',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  colorSchemeHumidity: string | Color = {
    name: 'red',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#E43212', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private temperatureService: TemperatureService,
              private humidityService: HumidityService) {
  }

  ngOnInit(): void {
    this.setHumidityData();
    this.setTemperatureData();
    this.humidityService.listenForDataSeries(environment.humiditySensorId)
      .pipe(
        takeUntil(this.notifier$)
      ).
      subscribe(() => {
        this.setHumidityData();
      });
    this.temperatureService.listenForDataSeries(environment.temperatureSensorId)
      .pipe(
        takeUntil(this.notifier$)
      ).
    subscribe(() => {
      this.setTemperatureData();
    });

  }

  ngOnDestroy(): void {
    this.notifier$.next()
    this.notifier$.complete()
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private setHumidityData() {
    this.humidityService.getDataSeries(environment.humiditySensorId)
      .subscribe(series => {
        this.seriesHumidity = [series];
      });
  }

  private setTemperatureData() {
    this.temperatureService.getDataSeries(environment.temperatureSensorId)
      .subscribe(series => {
        this.series = [series];
      });
  }
}
