import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-excluir-func',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './modal-excluir-func.component.html',
  styleUrl: './modal-excluir-func.component.css'
})
export class ModalExcluirFuncComponent {

}
