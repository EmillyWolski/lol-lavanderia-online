import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionarioLavagemComponent } from './modal-funcionario-lavagem.component';

describe('ModalFuncionarioLavagemComponent', () => {
  let component: ModalFuncionarioLavagemComponent;
  let fixture: ComponentFixture<ModalFuncionarioLavagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFuncionarioLavagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFuncionarioLavagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
