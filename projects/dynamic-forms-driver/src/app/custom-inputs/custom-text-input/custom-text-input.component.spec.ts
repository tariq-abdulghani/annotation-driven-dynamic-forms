import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextInputComponent } from './custom-text-input.component';

describe('CustomTextInputComponent', () => {
  let component: CustomTextInputComponent;
  let fixture: ComponentFixture<CustomTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTextInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
