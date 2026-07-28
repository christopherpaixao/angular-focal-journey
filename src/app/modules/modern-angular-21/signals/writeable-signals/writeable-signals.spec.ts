import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteableSignals } from './writeable-signals';

describe('WriteableSignals', () => {
  let component: WriteableSignals;
  let fixture: ComponentFixture<WriteableSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteableSignals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteableSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
