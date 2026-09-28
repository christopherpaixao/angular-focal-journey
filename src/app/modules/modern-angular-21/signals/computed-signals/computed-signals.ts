import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-computed-signals',
  imports: [],
  templateUrl: './computed-signals.html',
  styleUrl: './computed-signals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComputedSignals {
  readonly firstNumber = signal(0);
  readonly secondNumber = signal(0);
  readonly sum = computed(() => this.firstNumber() + this.secondNumber());

  setSecondSignalTo10() {
    this.secondNumber.set(10);
  }

  incrementFirstSignal() {
    if (this.firstNumber() < 10) {
      this.firstNumber.update((value) => value + 1);
    }
  }

  incrementBothSignals() {
    if (this.firstNumber() < 10) {
      this.firstNumber.update((value) => value + 1);
    }
    if (this.secondNumber() < 10) {
      this.secondNumber.update((value) => value + 1);
    }
  }

  constructor() {
    // 7. Define an effect that displays both signals to the console whenever any of them changes
    effect(() => {
      console.log('First Number:', this.firstNumber());
      console.log('Second Number:', this.secondNumber());
    });
  }
}
