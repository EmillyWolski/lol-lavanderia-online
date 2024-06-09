import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { AutocadastroService } from '../../../services/autocadastro/autocadastro.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-tela-relatorios',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './tela-relatorios.component.html',
  styleUrl: './tela-relatorios.component.css'
})

export class TelaRelatoriosComponent implements OnInit {

  pessoaLogada: Pessoa | null = null;
  pessoas: Pessoa[] = [];

  constructor(
    private loginService: LoginService,
    private autocadastroService: AutocadastroService
  ) { }

  ngOnInit(): void {
    this.pessoaLogada = this.loginService.getPessoaLogada();
    this.pessoas = this.autocadastroService.listarTodos();
  }

  // Gerar PDF
  gerarRelatorioClientes(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    let yPos = 20;

    // Estilos do subtítulo
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('LOL - Lavanderia Online', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    // Estilos do título
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório de Clientes', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    this.pessoas.forEach((pessoa, index) => {
      doc.setDrawColor(52, 152, 219); // Cor azul para a linha
      doc.line(margin, yPos - 10, pageWidth - margin, yPos - 10); // Linha superior

      doc.setFontSize(12);
      doc.text(`ID: ${pessoa.id}`, margin, yPos);
      yPos += 10;
      doc.text(`Nome: ${pessoa.nome}`, margin, yPos);
      yPos += 10;
      doc.text(`CPF: ${pessoa.cpf}`, margin, yPos);
      yPos += 10;
      doc.text(`Email: ${pessoa.email}`, margin, yPos);
      yPos += 10;
      doc.text(`Endereço: ${pessoa.endereco}`, margin, yPos);
      yPos += 10;
      doc.text(`Telefone: ${pessoa.telefone}`, margin, yPos);
      yPos += 20; // Espaçamento adicional entre clientes
      doc.line(margin, yPos - 10, pageWidth - margin, yPos - 10); // Linha inferior

      if (yPos > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save('Relatorio_Clientes.pdf');
  }

}
