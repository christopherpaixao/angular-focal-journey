import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetection } from './change-detection';

describe('ChangeDetection', () => {
  let component: ChangeDetection;
  let fixture: ComponentFixture<ChangeDetection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeDetection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDetection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
