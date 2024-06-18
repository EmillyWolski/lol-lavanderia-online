import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
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

export const routes: Routes = [
  { path: '', redirectTo: 'inicio/login', pathMatch: 'full' },
  { path: 'inicio/login', component: LoginComponent },
  { path: 'inicio', redirectTo: 'inicio/login' },
  { path: 'autocadastro', component: AutocadastroComponent },
  { path: 'inicio-cliente', component: InicialClienteComponent },
  { path: 'consultar-pedido', component: ConsultarPedidoComponent },
  { path: 'fazer-pedido', component: FazerPedidoComponent },
  { path: 'inicio-funcionario', component: InicialFuncionarioComponent },
  { path: 'cadastrar-funcionario', component: CadastrarFuncionarioComponent },
  { path: 'manutencao-roupas', component: ManutencaoRoupasComponent },
  { path: 'editar-funcionario/:id', component: EditarFuncionarioComponent },

  { path: 'listar-funcionario', component: ListarFuncionarioComponent },
  { path: 'relatorios', component: TelaRelatoriosComponent },
  { path: 'cadastrar-peca-roupa', component: CadastrarPecaRoupaComponent },
  { path: 'editar-peca-roupa/:id', component: EditarPecaRoupaComponent },

  {
    path: 'inserir-pedido',
    component: InserirPedidoComponent,
  },
  {
    path: 'formulario-peca-roupa',
    component: FormularioPecaRoupaComponent,
  },
  {
    path: 'editar-peca-roupa-quantidade/:id',
    component: EditarPecaRoupaQuantidadeComponent,
  },
];
