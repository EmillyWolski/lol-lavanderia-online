import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionarioFinalizarPedidoComponent } from './modal-funcionario-finalizar-pedido.component';

describe('ModalFuncionarioFinalizarPedidoComponent', () => {
  let component: ModalFuncionarioFinalizarPedidoComponent;
  let fixture: ComponentFixture<ModalFuncionarioFinalizarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFuncionarioFinalizarPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFuncionarioFinalizarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
