import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { LoginComponent } from './components/login/login.component';
import { InicialClienteComponent } from './components/inicial-cliente/inicial-cliente.component';
import { ModalOrcamentoComponent } from './components/modal-orcamento/modal-orcamento.component';
import { ConsultarPedidoComponent } from './components/consultar-pedido/consultar-pedido.component';
import { ModalCancelarPedidoComponent } from './components/modal-cancelar-pedido/modal-cancelar-pedido.component';
import { ModalPagamentoComponent } from './components/modal-pagamento/modal-pagamento.component';
import { CommonModule } from '@angular/common';
import { ModalFiltroPeriodoComponent } from './components/modal-filtro-periodo/modal-filtro-periodo.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FazerPedidoComponent } from './components/fazer-pedido/fazer-pedido.component';
import { CadastrarFuncionarioComponent } from './components/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { EditarFuncionarioComponent } from './components/funcionario/editar-funcionario/editar-funcionario.component';
import { InicialFuncionarioComponent } from './components/funcionario/inicial-funcionario/inicial-funcionario.component';
import { ManutencaoRoupasComponent } from './components/funcionario/manutencao-roupas/manutencao-roupas.component';
import { ModalFuncionarioExcluirPecaComponent } from './components/funcionario/modal-funcionario-excluir-peca/modal-funcionario-excluir-peca.component';
import { ModalFuncionarioFinalizarPedidoComponent } from './components/funcionario/modal-funcionario-finalizar-pedido/modal-funcionario-finalizar-pedido.component';
import { ModalFuncionarioLavagemComponent } from './components/funcionario/modal-funcionario-lavagem/modal-funcionario-lavagem.component';
import { ModalFuncionarioRecolhimentoComponent } from './components/funcionario/modal-funcionario-recolhimento/modal-funcionario-recolhimento.component';
import { ListarFuncionarioComponent } from './components/funcionario/listar-funcionario/listar-funcionario.component';
import { ManutencaoPecasRoupaComponent } from './components/funcionario/manutencao-pecas-roupa/manutencao-pecas-roupa.component';
import { ModalExcluirFuncComponent } from './components/funcionario/modal-excluir-func/modal-excluir-func.component';
import { TelaRelatoriosComponent } from './components/funcionario/tela-relatorios/tela-relatorios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    AutocadastroComponent,
    LoginComponent,
    InicialClienteComponent,
    ConsultarPedidoComponent,
    FazerPedidoComponent,
    ModalOrcamentoComponent,
    ModalCancelarPedidoComponent,
    ModalPagamentoComponent,
    ModalFiltroPeriodoComponent,
    CadastrarFuncionarioComponent,
    EditarFuncionarioComponent,
    InicialFuncionarioComponent,
    ListarFuncionarioComponent,
    ManutencaoPecasRoupaComponent,
    ManutencaoRoupasComponent,
    ModalExcluirFuncComponent,
    ModalFuncionarioExcluirPecaComponent,
    ModalFuncionarioFinalizarPedidoComponent,
    ModalFuncionarioLavagemComponent,
    ModalFuncionarioRecolhimentoComponent,
    ReactiveFormsModule,
    TelaRelatoriosComponent,
  ],
})
export class AppComponent {
  title = 'lol-lavanderia-online';
}
