import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRelatoriosComponent } from './tela-relatorios.component';

describe('TelaRelatoriosComponent', () => {
  let component: TelaRelatoriosComponent;
  let fixture: ComponentFixture<TelaRelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaRelatoriosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
