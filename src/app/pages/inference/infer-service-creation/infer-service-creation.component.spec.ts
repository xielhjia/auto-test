import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InferServiceCreationComponent } from './infer-service-creation.component';

describe('InferServiceCreationComponent', () => {
  let component: InferServiceCreationComponent;
  let fixture: ComponentFixture<InferServiceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InferServiceCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InferServiceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
