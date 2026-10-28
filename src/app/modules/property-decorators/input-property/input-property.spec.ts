import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputProperties } from './input-property';

describe('InputOutputProperties', () => {
  let component: InputOutputProperties;
  let fixture: ComponentFixture<InputOutputProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOutputProperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputProperties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
