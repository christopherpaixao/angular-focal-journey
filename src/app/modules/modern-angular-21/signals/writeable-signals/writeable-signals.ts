import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { mySignal } from './my-signal';

@Component({
  selector: 'app-writeable-signals',
  imports: [],
  templateUrl: './writeable-signals.html',
  styleUrl: './writeable-signals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WriteableSignals {
  // readonly firstSignal = mySignal(52);
  // readonly secondSignal = mySignal('MySignals');

  readonly firstSignal = signal(42);
  readonly secondSignal = signal('Signals');

  //Define um novo valor
  setSignal() {
    this.firstSignal.set(10);
  }

  //define um novo valor que depende do valor original (Não recebe um valor, recebe uma função que calcula o valor)
  updateSignal() {
    this.firstSignal.update((value) => value + 1);
  }

  constructor() {
    console.log('The firstSignals value is:', this.firstSignal());
    console.log('The secondSignals value is:', this.secondSignal());
  }
}
