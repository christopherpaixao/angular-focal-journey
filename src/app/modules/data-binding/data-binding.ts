import { Component } from '@angular/core';
import { InputOutputProperties } from '../input-property/input-property';
import { OutputProperty } from '../output-property/output-property';

@Component({
  selector: 'app-data-binding',
  imports: [InputOutputProperties, OutputProperty],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
})
export class DataBinding {
  url = 'https://angular.dev';
  angularCourse = true;
  imageUrl = 'http://lorempixel.com.br/400/200/nature';

  nomeDoCurso: string = 'Angular';

  valorInicial = 15;

  getValue() {
    return 1;
  }

  getLikeCourse() {
    return true;
  }

  onMudouValor(event: any) {
    console.log('O valor mudou: ', event.novoValor);
  }
}
