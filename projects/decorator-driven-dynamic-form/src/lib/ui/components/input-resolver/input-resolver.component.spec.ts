import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputResolverComponent } from './input-resolver.component';

describe('InputResolverComponent', () => {
  let component: InputResolverComponent;
  let fixture: ComponentFixture<InputResolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputResolverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
