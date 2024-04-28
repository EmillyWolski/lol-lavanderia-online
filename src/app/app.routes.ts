import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { InicialClienteComponent } from './components/inicial-cliente/inicial-cliente.component';
import { ConsultarPedidoComponent } from './components/consultar-pedido/consultar-pedido.component';
import { FazerPedidoComponent } from './components/fazer-pedido/fazer-pedido.component';
import { ModalOrcamentoComponent } from './components/modal-orcamento';
import { ModalCancelarPedidoComponent } from './components/modal-cancelar-pedido';
import { ModalPagamentoComponent } from './components/modal-pagamento';
import { InicialFuncionarioComponent } from './components/funcionario/inicial-funcionario/inicial-funcionario.component';
import { ModalFuncionarioLavagemComponent } from './components/funcionario/modal-funcionario-lavagem/modal-funcionario-lavagem.component';
import { ModalFuncionarioFinalizarPedidoComponent } from './components/funcionario/modal-funcionario-finalizar-pedido/modal-funcionario-finalizar-pedido.component';
import { ModalFuncionarioRecolhimentoComponent } from './components/funcionario/modal-funcionario-recolhimento/modal-funcionario-recolhimento.component';
import { CadastrarFuncionarioComponent } from './components/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { ManutencaoRoupasComponent } from './components/funcionario/manutencao-roupas/manutencao-roupas.component';
import { EditarFuncionarioComponent } from './components/funcionario/editar-funcionario/editar-funcionario.component';
import { ListarFuncionarioComponent } from './components/funcionario/listar-funcionario/listar-funcionario.component';
import { ManutencaoPecasRoupaComponent } from './components/funcionario/manutencao-pecas-roupa/manutencao-pecas-roupa.component';
import { ModalExcluirFuncComponent } from './components/funcionario/modal-excluir-func/modal-excluir-func.component';
import { ModalFuncionarioExcluirPecaComponent } from './components/funcionario/modal-funcionario-excluir-peca/modal-funcionario-excluir-peca.component';
import { TelaRelatoriosComponent } from './components/funcionario/tela-relatorios/tela-relatorios.component';
import { ModalFiltroPeriodoComponent } from './components/modal-filtro-periodo/modal-filtro-periodo.component';

export const routes: Routes = [
    { path: '', 
        redirectTo: 'inicio/login',
        pathMatch: 'full',
    },
    { path: 'inicio/login',
        component: LoginComponent
    },
    { path: 'inicio',
        redirectTo: 'inicio/login'
    },
    { path: 'autocadastro', 
        component: AutocadastroComponent
    },
    { path: 'inicio-cliente',
        component: InicialClienteComponent
    },
    { path: 'consultar-pedido', 
        component: ConsultarPedidoComponent
    },
    { path: 'fazer-pedido',
        component: FazerPedidoComponent
    },
    { path: 'orcamento', 
        component: ModalOrcamentoComponent
    },
    { path: 'cancelar-pedido',
        component: ModalCancelarPedidoComponent
    },
    { path: 'pagamento',
        component: ModalPagamentoComponent
    },
    { path: 'inicio-funcionario',
        component: InicialFuncionarioComponent 
    },
    { path: 'confirmar-lavagem',
        component: ModalFuncionarioLavagemComponent
    },
    { path: 'confirmar-recolhimento',
        component: ModalFuncionarioRecolhimentoComponent
    },
    { path: 'finalizar-pedido',
        component: ModalFuncionarioFinalizarPedidoComponent
    },
    { path: 'cadastrar-funcionario', 
        component: CadastrarFuncionarioComponent
    },
    { path: 'manutencao-roupas', 
        component: ManutencaoRoupasComponent
    },
    { path: 'editar-funcionario/:id', 
        component: EditarFuncionarioComponent
    },

    { path: 'listar-funcionario', 
        component: ListarFuncionarioComponent
    },
    { path: 'manutencao-pecas-roupas', 
        component: ManutencaoPecasRoupaComponent
    },
    { path: 'manutencao-roupas', 
        component: ManutencaoRoupasComponent
    },
    { path: 'excluir-funcionario', 
        component: ModalExcluirFuncComponent
    },
    { path: 'excluir-peca', 
        component: ModalFuncionarioExcluirPecaComponent
    },
    { path: 'relatorios', 
        component: TelaRelatoriosComponent
    },
    { path: 'filtrar-periodo', 
        component: ModalFiltroPeriodoComponent
    },

];