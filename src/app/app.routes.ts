import { Routes } from '@angular/router';
import { DataBinding } from './modules/binding/data-binding/data-binding';
import { ClassStyleBinding } from './modules/binding/class-style-binding/class-style-binding';
import { EventBinding } from './modules/binding/event-binding/event-binding';
import { TwoWayDataBinding } from './modules/binding/two-way-data-binding/two-way-data-binding';
import { InputOutputProperties } from './modules/property-decorators/input-property/input-property';
import { StateManagement } from './modules/modern-angular-21/state-management/state-management';
import { WriteableSignals } from './modules/modern-angular-21/signals/writeable-signals/writeable-signals';
import { ComputedSignals } from './modules/modern-angular-21/signals/computed-signals/computed-signals';
import { LinkedSignals } from './modules/modern-angular-21/signals/linked-signals/linked-signals';

export const routes: Routes = [
  { path: '', component: LinkedSignals },
  { path: 'data-binding', component: DataBinding },
  { path: 'class-style-binding', component: ClassStyleBinding },
  { path: 'event-binding', component: EventBinding },
  { path: 'two-way-data-binding', component: TwoWayDataBinding },
  { path: 'input-property', component: InputOutputProperties },
  { path: 'writeable-signals', component: WriteableSignals },
  { path: 'linked-signals', component: LinkedSignals },
];
