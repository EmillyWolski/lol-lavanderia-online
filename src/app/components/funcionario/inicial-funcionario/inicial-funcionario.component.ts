import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicial-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './inicial-funcionario.component.html',
  styleUrl: './inicial-funcionario.component.css'
})
export class InicialFuncionarioComponent {

}
