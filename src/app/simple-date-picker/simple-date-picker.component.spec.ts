import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDatePickerComponent } from './simple-date-picker.component';

describe('SimpleDatePickerComponent', () => {
  let component: SimpleDatePickerComponent;
  let fixture: ComponentFixture<SimpleDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
