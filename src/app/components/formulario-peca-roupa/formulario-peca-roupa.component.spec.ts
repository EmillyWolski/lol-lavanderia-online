import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPecaRoupaComponent } from './formulario-peca-roupa.component';

describe('FormularioPecaRoupaComponent', () => {
  let component: FormularioPecaRoupaComponent;
  let fixture: ComponentFixture<FormularioPecaRoupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPecaRoupaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioPecaRoupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
