import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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

  @ViewChild('campoInput') campoValorInput: ElementRef | null = null;

  incrementa() {
    if (this.campoValorInput) {
      this.campoValorInput.nativeElement.value++;
      this.mudouValor.emit({ novoValor: this.campoValorInput.nativeElement.value });
    }
  }

  decrementa() {
    if (this.campoValorInput) {
      this.campoValorInput.nativeElement.value--;
      this.mudouValor.emit({ novoValor: this.campoValorInput.nativeElement.value });
    }
  }
}
