import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-property',
  imports: [],
  templateUrl: './input-property.html',
  styleUrl: './input-property.scss',
  // inputs: ['nomeCurso: nome'], // Outra forma de declarar a propriedade de entrada, usando a propriedade inputs do decorador @Component. O nome da propriedade do componente filho é nomeCurso e o nome da propriedade que será usada no template do componente pai é nome.
})
export class InputOutputProperties {
  // O parâmetro do decorador @Input é o nome da propriedade que será usada no template do componente pai para passar o valor para a propriedade do componente filho. Se o nome da propriedade for o mesmo, não é necessário passar um parâmetro para o decorador @Input.
  @Input('nome') nomeCurso: string = '';
}
