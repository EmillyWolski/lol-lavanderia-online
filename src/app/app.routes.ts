import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { InicialClienteComponent } from './components/inicial-cliente/inicial-cliente.component';
import { FazerPedidoComponent } from './components/fazer-pedido/fazer-pedido.component';
import { ModalOrcamentoComponent } from './components/modal-orcamento';
import { ModalCancelarPedidoComponent } from './components/modal-cancelar-pedido';
import { ModalPagamentoComponent } from './components/modal-pagamento';
import { ConsultarPedidoComponent } from './components/consultar-pedido';
import { InicialFuncionarioComponent } from './components/funcionario/inicial-funcionario/inicial-funcionario.component';
import { ModalFuncionarioLavagemComponent } from './components/funcionario/modal-funcionario-lavagem/modal-funcionario-lavagem.component';
import { ModalFuncionarioFinalizarPedidoComponent } from './components/funcionario/modal-funcionario-finalizar-pedido/modal-funcionario-finalizar-pedido.component';
import { ModalFuncionarioRecolhimentoComponent } from './components/funcionario/modal-funcionario-recolhimento/modal-funcionario-recolhimento.component';
import { CadastrarFuncionarioComponent } from './components/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'autocadastro', component: AutocadastroComponent },
    { path: 'inicio-cliente', component: InicialClienteComponent },
    { path: 'fazer-pedido', component: FazerPedidoComponent },
    { path: 'orcamento', component: ModalOrcamentoComponent },
    { path: 'cancelar-pedido', component: ModalCancelarPedidoComponent },
    { path: 'pagamento', component: ModalPagamentoComponent },
    { path: 'consultar-pedido', component: ConsultarPedidoComponent },
    { path: 'inicio-funcionario', component: InicialFuncionarioComponent },
    { path: 'confirmar-lavagem', component: ModalFuncionarioLavagemComponent },
    { path: 'confirmar-recolhimento', component: ModalFuncionarioRecolhimentoComponent },
    { path: 'finalizar-pedido', component: ModalFuncionarioFinalizarPedidoComponent },
    { path: 'cadastrar-funcionario', component: CadastrarFuncionarioComponent },

];