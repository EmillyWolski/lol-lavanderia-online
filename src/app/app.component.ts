import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { LoginComponent } from './auth/login/login.component';
import { InicialClienteComponent } from './components/inicial-cliente/inicial-cliente.component';
import { ModalOrcamentoComponent } from './components/modal-orcamento/modal-orcamento.component';
import { ConsultarPedidoComponent } from './components/consultar-pedido/consultar-pedido.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FazerPedidoComponent } from './components/fazer-pedido/fazer-pedido.component';
import { CadastrarFuncionarioComponent } from './components/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { EditarFuncionarioComponent } from './components/funcionario/editar-funcionario/editar-funcionario.component';
import { InicialFuncionarioComponent } from './components/funcionario/inicial-funcionario/inicial-funcionario.component';
import { ManutencaoRoupasComponent } from './components/funcionario/manutencao-roupas/manutencao-roupas.component';
import { ListarFuncionarioComponent } from './components/funcionario/listar-funcionario/listar-funcionario.component';
import { TelaRelatoriosComponent } from './components/funcionario/tela-relatorios/tela-relatorios.component';
import { FormsModule } from '@angular/forms';
import { CadastrarPecaRoupaComponent } from './components/funcionario/cadastrar-peca-roupa/cadastrar-peca-roupa.component';
import { EditarPecaRoupaComponent } from './components/funcionario/editar-peca-roupa/editar-peca-roupa.component';
import { HttpClientModule } from '@angular/common/http';

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
    CadastrarFuncionarioComponent,
    EditarFuncionarioComponent,
    InicialFuncionarioComponent,
    ListarFuncionarioComponent,
    ManutencaoRoupasComponent,
    ReactiveFormsModule,
    TelaRelatoriosComponent,
    FormsModule,
    CadastrarPecaRoupaComponent,
    // EditarPecaRoupaComponent,
    ModalOrcamentoComponent,
    HttpClientModule,
  ],
})
export class AppComponent {
  title = 'lol-lavanderia-online';
}
