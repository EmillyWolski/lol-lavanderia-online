import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AutocadastroService } from '../../services/autocadastro/autocadastro.service';
import { Pessoa } from '../../shared/models/pessoa.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css'
})
export class AutocadastroComponent {
  @ViewChild('autocadastroForm') autocadastroForm!: NgForm;
  pessoa: Pessoa = new Pessoa();
  pessoaCadastrada: Pessoa | null = null;

  constructor(private autocadastroService: AutocadastroService) {}

  inserir(): void {
    if (this.autocadastroForm.form.valid) {
      this.autocadastroService.inserir(this.pessoa);
      this.pessoaCadastrada = { ...this.pessoa }; // Armazena os detalhes da pessoa cadastrada
      this.pessoa = new Pessoa(); // Limpa o formulário
    }
  }
}
