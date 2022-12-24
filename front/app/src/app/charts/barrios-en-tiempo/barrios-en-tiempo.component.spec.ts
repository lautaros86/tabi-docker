import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarriosEnTiempoComponent } from './barrios-en-tiempo.component';

describe('BarriosEnTiempoComponent', () => {
  let component: BarriosEnTiempoComponent;
  let fixture: ComponentFixture<BarriosEnTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarriosEnTiempoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarriosEnTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
