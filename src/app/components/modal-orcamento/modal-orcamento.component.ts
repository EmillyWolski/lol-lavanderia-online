import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-orcamento',
  templateUrl: './modal-orcamento.component.html',
  styleUrls: ['./modal-orcamento.component.css']
})

export class ModalOrcamentoComponent {
  @Input() valorPedido: number | undefined;
  @Input() prazoMaximo: number | undefined;

  constructor() { }

}


