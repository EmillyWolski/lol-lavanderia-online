import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoRoupasComponent } from './manutencao-roupas.component';

describe('ManutencaoRoupasComponent', () => {
  let component: ManutencaoRoupasComponent;
  let fixture: ComponentFixture<ManutencaoRoupasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoRoupasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManutencaoRoupasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
