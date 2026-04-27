import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  imports: [],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
})
export class DataBinding {
  url = 'https://angular.dev';
  angularCourse = true;
  imageUrl = 'http://lorempixel.com.br/400/200/nature';
  getValue() {
    return 1;
  }

  getLikeCourse() {
    return true;
  }
}
