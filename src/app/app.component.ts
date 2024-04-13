import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    AutocadastroComponent,
    LoginComponent,
    InicialClienteComponent,
    ModalOrcamentoComponent,
    ConsultarPedidoComponent,
    ModalCancelarPedidoComponent,
    ModalPagamentoComponent,
    ModalFiltroPeriodoComponent,
    ReactiveFormsModule
  ],
})
export class AppComponent {
  title = 'lol-lavanderia-online';
}
