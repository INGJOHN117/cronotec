import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSoporteComponent } from './registro-soporte.component';

describe('RegistroSoporteComponent', () => {
  let component: RegistroSoporteComponent;
  let fixture: ComponentFixture<RegistroSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSoporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
