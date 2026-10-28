import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayDataBinding } from './two-way-data-binding';

describe('TwoWayDataBinding', () => {
  let component: TwoWayDataBinding;
  let fixture: ComponentFixture<TwoWayDataBinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoWayDataBinding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayDataBinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
