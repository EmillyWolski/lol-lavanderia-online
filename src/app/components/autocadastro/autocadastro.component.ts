import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css']
})
export class AutocadastroComponent {
  autocadastroForm = this.fb.group({
    cpf: ['', Validators.required],
    nome: ['', Validators.required],
    emailCadastro: ['', [Validators.required, Validators.email]],
    endereco: ['', Validators.required],
    telefone: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const { cpf, nome, emailCadastro, endereco, telefone } = this.autocadastroForm.value;
    if (this.autocadastroForm.valid) {
      alert(`Dados do formulário:\n\nCPF: ${cpf}\nNome: ${nome}\nE-mail: ${emailCadastro}\nEndereço: ${endereco}\nTelefone: ${telefone}`);
      this.autocadastroForm.reset();
    } else {
      this.autocadastroForm.markAllAsTouched();
    }
  }  
}






