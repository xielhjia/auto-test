import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicScaleRulesComponent } from './dynamic-scale-rules.component';

describe('DynamicScaleRulesComponent', () => {
  let component: DynamicScaleRulesComponent;
  let fixture: ComponentFixture<DynamicScaleRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicScaleRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicScaleRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
