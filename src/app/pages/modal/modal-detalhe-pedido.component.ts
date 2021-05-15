import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-ModalDetalhePedido',
  templateUrl: './modal-detalhe-pedido.component.html',
  styleUrls: ['./modal-detalhe-pedido.component.scss']
})
export class ModalDetalhePedidoComponent implements OnInit, OnDestroy {
  constructor(private router: Router){
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  
  goBack() {
    window.history.back();
  }

}
