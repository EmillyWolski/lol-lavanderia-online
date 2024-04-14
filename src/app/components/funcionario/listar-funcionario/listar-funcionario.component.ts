import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './listar-funcionario.component.html',
  styleUrl: './listar-funcionario.component.css'
})
export class ListarFuncionarioComponent {

}
