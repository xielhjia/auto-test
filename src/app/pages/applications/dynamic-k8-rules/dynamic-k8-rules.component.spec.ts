import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicK8RulesComponent } from './dynamic-k8-rules.component';

describe('DynamicK8RulesComponent', () => {
  let component: DynamicK8RulesComponent;
  let fixture: ComponentFixture<DynamicK8RulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicK8RulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicK8RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
