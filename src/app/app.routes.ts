import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { InicialClienteComponent } from './components/inicial-cliente/inicial-cliente.component';
import { ConsultarPedidoComponent } from './components/consultar-pedido/consultar-pedido.component';
import { FazerPedidoComponent } from './components/fazer-pedido/fazer-pedido.component';
import { InicialFuncionarioComponent } from './components/funcionario/inicial-funcionario/inicial-funcionario.component';
import { CadastrarFuncionarioComponent } from './components/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { ManutencaoRoupasComponent } from './components/funcionario/manutencao-roupas/manutencao-roupas.component';
import { EditarFuncionarioComponent } from './components/funcionario/editar-funcionario/editar-funcionario.component';
import { ListarFuncionarioComponent } from './components/funcionario/listar-funcionario/listar-funcionario.component';
import { TelaRelatoriosComponent } from './components/funcionario/tela-relatorios/tela-relatorios.component';
import { CadastrarPecaRoupaComponent } from './components/funcionario/cadastrar-peca-roupa/cadastrar-peca-roupa.component';
import { EditarPecaRoupaComponent } from './components/funcionario/editar-peca-roupa/editar-peca-roupa.component';
import { InserirPedidoComponent } from './components/inserir-pedido/inserir-pedido.component';
import { Component } from '@angular/core';
import { FormularioPecaRoupaComponent } from './components/formulario-peca-roupa/formulario-peca-roupa.component';
import { EditarPecaRoupaQuantidadeComponent } from './components/editar-peca-roupa-quantidade/editar-peca-roupa-quantidade.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'autocadastro', component: AutocadastroComponent },
  {
    path: 'inicio-cliente',
    component: InicialClienteComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE',
    },
  },
  {
    path: 'consultar-pedido',
    component: ConsultarPedidoComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE',
    },
  },
  {
    path: 'fazer-pedido',
    component: FazerPedidoComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE',
    },
  },
  {
    path: 'inicio-funcionario',
    component: InicialFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },
  {
    path: 'cadastrar-funcionario',
    component: CadastrarFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },
  {
    path: 'manutencao-roupas',
    component: ManutencaoRoupasComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },
  {
    path: 'editar-funcionario/:id',
    component: EditarFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },

  {
    path: 'listar-funcionario',
    component: ListarFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },
  {
    path: 'relatorios',
    component: TelaRelatoriosComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },
  {
    path: 'cadastrar-peca-roupa',
    component: CadastrarPecaRoupaComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },
  {
    path: 'editar-peca-roupa/:id',
    component: EditarPecaRoupaComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNCIONARIO',
    },
  },

  {
    path: 'inserir-pedido',
    component: InserirPedidoComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE',
    },
  },
  {
    path: 'formulario-peca-roupa',
    component: FormularioPecaRoupaComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE',
    },
  },
  {
    path: 'editar-peca-roupa-quantidade/:id',
    component: EditarPecaRoupaQuantidadeComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
