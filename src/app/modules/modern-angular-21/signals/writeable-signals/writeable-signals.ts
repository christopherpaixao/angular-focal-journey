import { Component, signal } from '@angular/core';
import { mySignal } from './my-signal';

@Component({
  selector: 'app-writeable-signals',
  imports: [],
  templateUrl: './writeable-signals.html',
  styleUrl: './writeable-signals.scss',
})
export class WriteableSignals {
  // readonly fristSignals = signal(42);
  // readonly secondSignals = signal('Signals');

  readonly fristSignals = mySignal(52);
  readonly secondSignals = mySignal('MySignals');

  constructor() {
    console.log('The firstSignals value is:', this.fristSignals());
    console.log('The secondSignals value is:', this.secondSignals());
  }
}
