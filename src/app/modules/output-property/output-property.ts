import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'contador',
  imports: [],
  templateUrl: './output-property.html',
  styleUrl: './output-property.scss',
  // outputs: ['mudouValor'] // alternativa para usar o @Output() sem precisar importar o EventEmitter
})
export class OutputProperty {
  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter<{ novoValor: number }>();

  incrementa() {
    this.valor++;
    this.mudouValor.emit({ novoValor: this.valor });
  }

  decrementa() {
    this.valor--;
    this.mudouValor.emit({ novoValor: this.valor });
  }
}
