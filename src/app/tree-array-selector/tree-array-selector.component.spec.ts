import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeArraySelectorComponent } from './tree-array-selector.component';

describe('TreeSelectorComponent', () => {
  let component: TreeArraySelectorComponent;
  let fixture: ComponentFixture<TreeArraySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeArraySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeArraySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
