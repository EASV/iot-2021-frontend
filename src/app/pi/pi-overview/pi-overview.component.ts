import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {catchError, debounceTime, takeUntil} from 'rxjs/operators';
import {TemperatureService} from '../shared/temperature.service';
import {HumidityService} from '../shared/humidity.service';

@Component({
  selector: 'app-pi-overview',
  templateUrl: './pi-overview.component.html',
  styleUrls: ['./pi-overview.component.scss']
})
export class PiOverviewComponent implements OnInit, OnDestroy {
  notifier$ = new Subject();
  temperatureSubject = new Subject<number>();
  humiditySubject = new Subject<number>();
  temperatureValue: number | null | undefined;
  humidityValue: number | null | undefined;

  constructor(private humidityService: HumidityService,
              private temperatureService: TemperatureService) { }

  ngOnInit() {
    this.humidityService.current()
      .subscribe(measurement => {
        this.humidityValue = measurement?.value;
        console.log('value', measurement);
        this.humiditySubject.pipe(
          debounceTime(1000),
          takeUntil(this.notifier$)
        ).subscribe(value => {
          this.humidityService.humidityChanged(value).pipe(
            catchError(e => {
              console.log('error', e);
              return e;
            })
          ).subscribe();

        });
      })

    this.temperatureService.current()
      .subscribe(measurement => {
        this.temperatureValue = measurement?.value;
        this.temperatureSubject.pipe(
          debounceTime(1000),
          takeUntil(this.notifier$)
        ).subscribe(value => {
          console.log('temp changed old: ', this.temperatureValue);
          console.log('temp changed NEW: ', value);
          this.temperatureService.temperatureChanged(value).pipe(
            catchError(e => {
              console.log('error', e);
              return e;
            })
          ).subscribe();
        });
      });




  }

  onTemperatureSlide(value: number | null) {
    this.temperatureSubject.next(value ?? 0);
  }

  onHumiditySlide(value: number | null) {
    this.humiditySubject.next(value ?? 0);
  }

  ngOnDestroy(): void {
    this.notifier$.next()
    this.notifier$.complete()
  }

}
