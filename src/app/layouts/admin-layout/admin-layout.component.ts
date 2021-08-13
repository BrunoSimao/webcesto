import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/pages/pedidos/component/service/pedidos.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router,
    private pedidosService: PedidosService) { }

  ngOnInit() {
  }

}
