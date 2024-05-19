import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPecaRoupaQuantidadeComponent } from './editar-peca-roupa-quantidade.component';

describe('EditarPecaRoupaQuantidadeComponent', () => {
  let component: EditarPecaRoupaQuantidadeComponent;
  let fixture: ComponentFixture<EditarPecaRoupaQuantidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPecaRoupaQuantidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPecaRoupaQuantidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
