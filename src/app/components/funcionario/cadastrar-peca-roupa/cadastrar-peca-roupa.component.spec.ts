import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPecaRoupaComponent } from './cadastrar-peca-roupa.component';

describe('CadastrarPecaRoupaComponent', () => {
  let component: CadastrarPecaRoupaComponent;
  let fixture: ComponentFixture<CadastrarPecaRoupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarPecaRoupaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarPecaRoupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
