import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-funcionario-excluir-peca',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './modal-funcionario-excluir-peca.component.html',
  styleUrl: './modal-funcionario-excluir-peca.component.css'
})
export class ModalFuncionarioExcluirPecaComponent {

}