import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialClienteComponent } from './inicial-cliente.component';

describe('InicialClienteComponent', () => {
  let component: InicialClienteComponent;
  let fixture: ComponentFixture<InicialClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicialClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicialClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
