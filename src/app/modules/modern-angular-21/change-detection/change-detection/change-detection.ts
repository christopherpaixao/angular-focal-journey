import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './change-detection.html',
  styleUrl: './change-detection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // ChangeDetectionStrategy.OnPush
})
export class ChangeDetection {
  // counter = 0;

  readonly counter$ = interval(1000);

  // readonly changeDetector = inject(ChangeDetectorRef);

  /* chamar um evento angular é uma maneira de forçar a DETECTÇÃO DE ALTERAÇÕES 
  a ocorrer quando estamos usando changeDetection OnPush, mas nesse caso,
  o evento não faz nada, ele só serve para forçar a detecção de alterações
  a ocorrer. */
  doNothing() {}

  /* ao alterar uma das entradas, o Angular verifica automaticamente
  se há alterações nas expressões que os modelos estão vinculados eatualiza a view */

  constructor() {
    /* setInterval(() => {
      this.counter++;
      console.log('Counter updated:', this.counter);
    }, 1000); */
    /* Podemos chamar manualmente a detecção de alterações com o ChangeDetectorRef */
    /* setInterval(() => {
      this.changeDetector.detectChanges();
    }, 5000); */
  }
}
