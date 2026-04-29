import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  imports: [],
  templateUrl: './event-binding.html',
  styleUrl: './event-binding.scss',
})
export class EventBinding {
  valorAtual: string = '';
  valorSalvo: string = '';

  isMouseOver: boolean = false;

  onButtonClick() {
    alert('Botão clicado!');
  }

  onKeyUp(event: KeyboardEvent) {
    // console.log('Tecla pressionada:', event.key);
    this.valorAtual = (event.target as HTMLInputElement).value;
  }

  salvarValor(valor: string) {
    // console.log('Valor salvo:', valor);
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }
}
