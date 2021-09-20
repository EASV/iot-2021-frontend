import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Measurement} from './measurement';
import {DataSeries} from '../../charts/charts-overview/shared/data-series';
import {map} from 'rxjs/operators';
import {DataEntry} from '../../charts/charts-overview/shared/data-entry';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient,
              private socket: Socket) { }

  temperatureChanged(value: number | null): Observable<Measurement> {
    if(value == null) of(null);
    return this.http.put<Measurement>(environment.url + '/temperature',  {
      sensorId: environment.temperatureSensorId,
      value: value,
      measurementTime: Date.now()
    });
  }

  current(): Observable<Measurement> {
    return this.http.get<Measurement>(environment.url + '/temperature/latest');
  }

  getDataSeries(temperatureSensorId: string): Observable<DataSeries> {
    return this.http.get<Measurement[]>(environment.url + '/temperature?sensorId=' + temperatureSensorId)
      .pipe(map(measurements => {
        const series: DataEntry[] = [];
        const dataSeries: DataSeries = {
          name: temperatureSensorId,
          series: series,
        };
        if(measurements instanceof Array) {
          measurements.forEach(m => {
            series.push({
              name: m.measurementTime.toString(),
              value: m.value
            })
          })
        }
        return dataSeries;
      }));
  }

  listenForDataSeries(sensorId: string): Observable<DataEntry> {
    return this.socket.fromEvent<Measurement>(sensorId)
      .pipe(map(measurement => {
        return {
          name: measurement.measurementTime.toString(),
          value: measurement.value
        }
      }));
  }
}
