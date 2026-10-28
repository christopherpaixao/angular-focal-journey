import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-data-binding',
  imports: [FormsModule],
  templateUrl: './two-way-data-binding.html',
  styleUrl: './two-way-data-binding.scss',
})
export class TwoWayDataBinding {
  nome: string = 'abc';

  pessoa = {
    nome: 'Christopher',
    idade: 30,
  };
}
