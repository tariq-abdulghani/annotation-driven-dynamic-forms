import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonsInputComponent } from './radio-buttons-input.component';

describe('RadioButtonsInputComponent', () => {
  let component: RadioButtonsInputComponent;
  let fixture: ComponentFixture<RadioButtonsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioButtonsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
