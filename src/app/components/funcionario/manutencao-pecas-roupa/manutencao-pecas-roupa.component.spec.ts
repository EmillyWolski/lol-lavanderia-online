import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoPecasRoupaComponent } from './manutencao-pecas-roupa.component';

describe('ManutencaoPecasRoupaComponent', () => {
  let component: ManutencaoPecasRoupaComponent;
  let fixture: ComponentFixture<ManutencaoPecasRoupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoPecasRoupaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManutencaoPecasRoupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
