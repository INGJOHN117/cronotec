import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetaRegistroComponent } from './targeta-registro.component';

describe('TargetaRegistroComponent', () => {
  let component: TargetaRegistroComponent;
  let fixture: ComponentFixture<TargetaRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetaRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
