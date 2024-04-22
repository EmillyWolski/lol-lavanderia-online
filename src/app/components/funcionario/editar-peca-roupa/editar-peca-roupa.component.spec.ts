import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPecaRoupaComponent } from './editar-peca-roupa.component';

describe('EditarPecaRoupaComponent', () => {
  let component: EditarPecaRoupaComponent;
  let fixture: ComponentFixture<EditarPecaRoupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPecaRoupaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPecaRoupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
