import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { AutocadastroService } from '../../../services/autocadastro/autocadastro.service';
import { jsPDF } from 'jspdf';
import { PedidoService } from '../../../services/pedido/pedido.service';

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
    private autocadastroService: AutocadastroService,
    private pedidoService: PedidoService // Injete o serviço PedidoService
  ) { }

  ngOnInit(): void {
    this.pessoaLogada = this.loginService.getPessoaLogada();
    this.pessoas = this.autocadastroService.listarTodos();
  }


  // Gerar PDF de Relatório de Clientes
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


  // Método para gerar relatório de receitas
  gerarRelatorioReceitas(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    let yPos = 20;

    // Obtém a receita total
    const receitaTotal = this.pedidoService.obterReceitaTotal();

    // Estilos do subtítulo
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('LOL - Lavanderia Online', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    // Estilos do título
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório de Receitas', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    doc.setDrawColor(52, 152, 219); // Cor azul para a linha
    doc.line(margin, yPos - 10, pageWidth - margin, yPos - 10); // Linha superior

    // Escreve a receita total
    doc.setFontSize(12);
    doc.text(`Receita Total: R$ ${receitaTotal.toFixed(2)}`, margin, yPos);

    doc.save('Relatorio_Receitas.pdf');
  }


  // Método para gerar relatório de clientes fiéis
  gerarRelatorioClientesFieis(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    let yPos = 20;

    // Obtém todos os pedidos
    const pedidos = this.pedidoService.listarTodos();

    // Verifica se há pedidos
    if (!pedidos || pedidos.length === 0) {
      // Caso não haja pedidos, exibe uma mensagem e retorna
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Nenhum pedido encontrado.', pageWidth / 2, yPos, { align: 'center' });
      doc.save('Relatorio_Clientes_Fieis.pdf');
      return;
    }

    // Mapeia os clientes e a quantidade de pedidos de cada um
    const clientesPedidos = new Map<string, number>();
    pedidos.forEach((pedido) => {
      const nomeCliente = pedido.nomecliente;
      clientesPedidos.set(nomeCliente, (clientesPedidos.get(nomeCliente) || 0) + 1);
    });

    // Ordena os clientes pelo número de pedidos
    const clientesOrdenados = Array.from(clientesPedidos.entries()).sort((a, b) => b[1] - a[1]);

    // Seleciona os três clientes mais fiéis
    const topClientesFieis = clientesOrdenados.slice(0, 3).map(([nomeCliente, _]) => nomeCliente);

    // Verifica se há clientes fiéis
    if (topClientesFieis.length === 0) {
      // Caso não haja clientes fiéis, exibe uma mensagem e retorna
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Nenhum cliente fiel encontrado.', pageWidth / 2, yPos, { align: 'center' });
      doc.save('Relatorio_Clientes_Fieis.pdf');
      return;
    }

    // Escreve o título do relatório
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('LOL - Lavanderia Online', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    // Escreve o título do relatório de clientes fiéis
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório dos 3 Clientes Mais Fiéis', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    // Escreve a lista dos três clientes mais fiéis
    topClientesFieis.forEach((cliente, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${cliente}`, margin, yPos);
      yPos += 10;
    });

    doc.save('Relatorio_Clientes_Fieis.pdf');
  }

}
