import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStyleBinding } from './class-style-binding';

describe('ClassStyleBinding', () => {
  let component: ClassStyleBinding;
  let fixture: ComponentFixture<ClassStyleBinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassStyleBinding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassStyleBinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
