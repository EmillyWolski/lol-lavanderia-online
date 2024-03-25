import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialFuncionarioComponent } from './inicial-funcionario.component';

describe('InicialFuncionarioComponent', () => {
  let component: InicialFuncionarioComponent;
  let fixture: ComponentFixture<InicialFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicialFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicialFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
