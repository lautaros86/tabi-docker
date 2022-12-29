import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPorZonaComponent } from './datos-por-zona.component';

describe('DatosPorZonaComponent', () => {
  let component: DatosPorZonaComponent;
  let fixture: ComponentFixture<DatosPorZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPorZonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPorZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
