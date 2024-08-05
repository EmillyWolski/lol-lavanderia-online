import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal-orcamento',
  standalone: true,
  templateUrl: './modal-orcamento.component.html',
  styleUrls: ['./modal-orcamento.component.css']
})

export class ModalOrcamentoComponent {
  @Input() valorPedido: number | undefined;
  @Input() prazoMaximo: number | undefined;
  @Output() aprovar = new EventEmitter<void>();
  @Output() recusar = new EventEmitter<void>();

  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;

  open(): void {
    // Abrir o modal 
    this.modal.nativeElement.classList.add('show');
    this.modal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  close(): void {
    // Fechar o modal 
    this.modal.nativeElement.classList.remove('show');
    this.modal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  onAprovar(): void {
    this.aprovar.emit();
    this.close();
  }

  onRecusar(): void {
    this.recusar.emit();
    this.close();
    alert("O orçamento do pedido foi rejeitado.")
  }
}

