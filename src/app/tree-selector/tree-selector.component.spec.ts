import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSelectorComponent } from './tree-selector.component';

describe('TreeSelectorComponent', () => {
  let component: TreeSelectorComponent;
  let fixture: ComponentFixture<TreeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
