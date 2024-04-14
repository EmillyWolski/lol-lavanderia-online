import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-funcionario-recolhimento',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './modal-funcionario-recolhimento.component.html',
  styleUrl: './modal-funcionario-recolhimento.component.css'
})
export class ModalFuncionarioRecolhimentoComponent {

}
