import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeInputComponent } from './composite-input.component';

describe('CompositeInputComponent', () => {
  let component: CompositeInputComponent;
  let fixture: ComponentFixture<CompositeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
