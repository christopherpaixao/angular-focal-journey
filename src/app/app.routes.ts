import { Routes } from '@angular/router';
import { DataBinding } from './modules/data-binding/data-binding';
import { ClassStyleBinding } from './modules/class-style-binding/class-style-binding';
import { EventBinding } from './modules/event-binding/event-binding';
import { TwoWayDataBinding } from './modules/two-way-data-binding/two-way-data-binding';
import { InputOutputProperties } from './modules/input-property/input-property';
import { StateManagement } from './modules/modern-angular-21/state-management/state-management';
import { WriteableSignals } from './modules/modern-angular-21/signals/writeable-signals/writeable-signals';

export const routes: Routes = [
  { path: '', component: WriteableSignals },
  { path: 'data-binding', component: DataBinding },
  { path: 'class-style-binding', component: ClassStyleBinding },
  { path: 'event-binding', component: EventBinding },
  { path: 'two-way-data-binding', component: TwoWayDataBinding },
  { path: 'input-property', component: InputOutputProperties },
  { path: 'writeable-signals', component: WriteableSignals },
];
