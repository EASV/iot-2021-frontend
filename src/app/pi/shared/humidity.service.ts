import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Measurement} from './measurement';
import {map} from 'rxjs/operators';
import {DataEntry} from '../../charts/charts-overview/shared/data-entry';
import {DataSeries} from '../../charts/charts-overview/shared/data-series';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class HumidityService {

  constructor(private http: HttpClient,
              private socket: Socket) { }

  humidityChanged(value: number | null): Observable<Measurement> {
    if(value == null) of(null);
    return this.http.put<Measurement>(environment.url + '/humidity',  {
      sensorId: environment.humiditySensorId,
      value: value,
      measurementTime: Date.now()
    });
  }

  current(): Observable<Measurement> {
    return this.http.get<Measurement>(environment.url + '/humidity/latest');
  }

  getDataSeries(humiditySensorId: string) {
    return this.http.get<Measurement[]>(environment.url + '/humidity?sensorId=' + humiditySensorId)
      .pipe(map(measurements => {
        const series: DataEntry[] = [];
        const dataSeries: DataSeries = {
          name: humiditySensorId,
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

  listenForDataSeries(humiditySensorId: string): Observable<DataEntry> {
    return this.socket.fromEvent<Measurement>(humiditySensorId)
      .pipe(map(measurement => {
       return {
         name: measurement.measurementTime.toString(),
         value: measurement.value
       }
      }));
  }
}
