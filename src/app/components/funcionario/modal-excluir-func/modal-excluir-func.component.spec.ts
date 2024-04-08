import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirFuncComponent } from './modal-excluir-func.component';

describe('ModalExcluirFuncComponent', () => {
  let component: ModalExcluirFuncComponent;
  let fixture: ComponentFixture<ModalExcluirFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExcluirFuncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalExcluirFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
