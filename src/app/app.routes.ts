import { Routes } from '@angular/router';
import { DataBinding } from './modules/data-binding/data-binding';
import { ClassStyleBinding } from './modules/class-style-binding/class-style-binding';

export const routes: Routes = [
  { path: '', component: DataBinding },
  { path: 'data-binding', component: DataBinding },
  { path: 'class-style-binding', component: ClassStyleBinding },
];
