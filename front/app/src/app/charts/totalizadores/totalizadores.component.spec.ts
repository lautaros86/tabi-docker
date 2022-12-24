import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalizadoresComponent } from './totalizadores.component';

describe('TotalizadoresComponent', () => {
  let component: TotalizadoresComponent;
  let fixture: ComponentFixture<TotalizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalizadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
