import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

type Options = Record<string, string>;
@Component({
  selector: 'app-state-management',
  imports: [],
  templateUrl: './state-management.html',
  styleUrl: './state-management.scss',
})
export class StateManagement {
  readonly a$ = new BehaviorSubject<number>(1);
  readonly b$ = new BehaviorSubject<number>(2);

  readonly sum$ = combineLatest([this.a$, this.b$]).pipe(map(([a, b]) => a + b));

  async incA() {
    //only increment A if A + B less than 10
    const sum = await firstValueFrom(this.sum$);
    if (sum < 10) {
      this.a$.next(this.a$.value + 1);
    }
  }

  readonly options$ = new BehaviorSubject<Options>({ r: 'Red', g: 'Green', b: 'Blue' });
  readonly selectedKey$ = new BehaviorSubject<string>('b');

  readonly selectedValue$ = combineLatest([this.options$, this.selectedKey$]).pipe(
    debounceTime(0),
    map(([options, key]) => options[key]),
  );

  switchOptions() {
    this.options$.next({ m: 'Magenta', c: 'Cyan', y: 'Yellow' });
    this.selectedKey$.next('c');
  }

  constructor() {
    this.selectedValue$.subscribe(console.log);
  }
}
