import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionarioExcluirPecaComponent } from './modal-funcionario-excluir-peca.component';

describe('ModalFuncionarioExcluirPecaComponent', () => {
  let component: ModalFuncionarioExcluirPecaComponent;
  let fixture: ComponentFixture<ModalFuncionarioExcluirPecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFuncionarioExcluirPecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFuncionarioExcluirPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
