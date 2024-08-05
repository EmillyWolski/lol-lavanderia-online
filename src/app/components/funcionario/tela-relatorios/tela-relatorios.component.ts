import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { AutocadastroService } from '../../../services/autocadastro/autocadastro.service';
import { jsPDF } from 'jspdf';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../shared/models/pedido.model';

@Component({
  selector: 'app-tela-relatorios',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './tela-relatorios.component.html',
  styleUrls: ['./tela-relatorios.component.css']
})
export class TelaRelatoriosComponent implements OnInit {

  pessoaLogada: Pessoa | null = null;
  pessoas: Pessoa[] = [];
  pedidos: Pedido[] = []; // Adicionando o array de pedidos

  constructor(
    private loginService: LoginService,
    private autocadastroService: AutocadastroService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.pessoaLogada = this.loginService.getPessoaLogada();
    this.pessoas = this.autocadastroService.listarTodos();
    this.carregarPedidos(); // Carregar os pedidos ao iniciar o componente
  }

  private carregarPedidos(): void {
    this.pedidoService.listarTodosPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  // Gerar PDF de Relatório de Clientes
  gerarRelatorioClientes(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    let yPos = 20;

    // Estilos do título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('LOL - Lavanderia Online', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    // Estilos do sub-título
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório de Clientes', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    this.pessoas.forEach((pessoa, index) => {
      doc.setDrawColor(200, 200, 200); // Cor para a linha
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
      doc.text(`CEP: ${pessoa.cep}`, margin, yPos);
      yPos += 10;
      doc.text(`Rua: ${pessoa.rua}`, margin, yPos);
      yPos += 10;
      doc.text(`Cidade: ${pessoa.cidade}`, margin, yPos);
      yPos += 10;
      doc.text(`Estado: ${pessoa.estado}`, margin, yPos);
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

    // Obtém a data atual
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy

    // Obtém a receita total
    const receitaTotal = this.pedidoService.obterReceitaTotal();

    // Estilos do título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('LOL - Lavanderia Online', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    // Estilos do sub-título
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório de Receitas', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    doc.setDrawColor(200, 200, 200); // Cor para a linha
    doc.line(margin, yPos - 10, pageWidth - margin, yPos - 10); // Linha superior

    // Adiciona a data da extração do relatório
    doc.setFontSize(12);
    doc.text(`Data de Extração: ${dataFormatada}`, margin, yPos);
    yPos += 10;

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

    // Verifica se há pedidos carregados
    if (!this.pedidos || this.pedidos.length === 0) {
      // Caso não haja pedidos, exibe uma mensagem 
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Nenhum pedido encontrado.', pageWidth / 2, yPos, { align: 'center' });
      doc.save('Relatorio_Clientes_Fieis.pdf');
      return;
    }

    // Mapeia os clientes e as informações de pedidos e receitas de cada um
    const clientesDados = new Map<string, { quantidadePedidos: number, receitaTotal: number }>();
    this.pedidos.forEach((pedido) => {
      const nomeCliente = pedido.nomecliente;

      if (clientesDados.has(nomeCliente)) {
        const dados = clientesDados.get(nomeCliente)!;
        dados.quantidadePedidos += 1;
        dados.receitaTotal += pedido.valorpedido || 0; // Protege contra undefined
      } else {
        clientesDados.set(nomeCliente, { quantidadePedidos: 1, receitaTotal: pedido.valorpedido || 0 }); // Protege contra undefined
      }
    });

    // Ordena os clientes pelos valores da receita total (do maior para o menor)
    const clientesOrdenados = Array.from(clientesDados.entries()).sort((a, b) => b[1].receitaTotal - a[1].receitaTotal);

    // Seleciona os três clientes mais fiéis
    const topClientesFieis = clientesOrdenados.slice(0, 3);

    // Verifica se há clientes fiéis
    if (topClientesFieis.length === 0) {
      // Caso não haja clientes fiéis, exibe uma mensagem
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

    // Escreve a lista dos três clientes mais fiéis com quantidade de pedidos e receita total
    topClientesFieis.forEach((cliente, index) => {
      doc.setDrawColor(200, 200, 200); // Cor para a linha
      doc.line(margin, yPos - 10, pageWidth - margin, yPos - 10); // Linha superior

      const [nomeCliente, dados] = cliente;
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${nomeCliente}`, margin, yPos);
      yPos += 10;

      doc.text(`Quantidade de Pedidos: ${dados.quantidadePedidos}`, margin, yPos);
      yPos += 10;

      doc.text(`Receita Total: R$ ${dados.receitaTotal.toFixed(2)}`, margin, yPos);
      yPos += 20; // Espaçamento adicional entre clientes
    });

    doc.save('Relatorio_Clientes_Fieis.pdf');
  }
}

