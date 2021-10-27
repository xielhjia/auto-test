import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCreationComponent } from './app-creation.component';

describe('AppCreationComponent', () => {
  let component: AppCreationComponent;
  let fixture: ComponentFixture<AppCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
