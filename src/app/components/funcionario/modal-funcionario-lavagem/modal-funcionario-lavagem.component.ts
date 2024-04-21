import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-funcionario-lavagem',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './modal-funcionario-lavagem.component.html',
  styleUrl: './modal-funcionario-lavagem.component.css'
})
export class ModalFuncionarioLavagemComponent {

}
