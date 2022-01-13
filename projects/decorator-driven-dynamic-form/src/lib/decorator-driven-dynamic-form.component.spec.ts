import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorDrivenDynamicFormComponent } from './decorator-driven-dynamic-form.component';

describe('DecoratorDrivenDynamicFormComponent', () => {
  let component: DecoratorDrivenDynamicFormComponent;
  let fixture: ComponentFixture<DecoratorDrivenDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoratorDrivenDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratorDrivenDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
