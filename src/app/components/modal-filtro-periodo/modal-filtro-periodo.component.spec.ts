import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltroPeriodoComponent } from './modal-filtro-periodo.component';

describe('ModalFiltroPeriodoComponent', () => {
  let component: ModalFiltroPeriodoComponent;
  let fixture: ComponentFixture<ModalFiltroPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFiltroPeriodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFiltroPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
