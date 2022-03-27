import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFromControlComponent } from './dynamic-form-control.component';

describe('DynamicFromControlComponent', () => {
  let component: DynamicFromControlComponent;
  let fixture: ComponentFixture<DynamicFromControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFromControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFromControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
