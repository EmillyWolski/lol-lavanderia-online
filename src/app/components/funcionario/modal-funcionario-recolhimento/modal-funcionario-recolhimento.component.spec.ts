import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionarioRecolhimentoComponent } from './modal-funcionario-recolhimento.component';

describe('ModalFuncionarioRecolhimentoComponent', () => {
  let component: ModalFuncionarioRecolhimentoComponent;
  let fixture: ComponentFixture<ModalFuncionarioRecolhimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFuncionarioRecolhimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFuncionarioRecolhimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
