import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoDeEdadComponent } from './rango-de-edad.component';

describe('RangoDeEdadComponent', () => {
  let component: RangoDeEdadComponent;
  let fixture: ComponentFixture<RangoDeEdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangoDeEdadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangoDeEdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
