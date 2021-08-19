import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { element } from 'protractor';
import { delay } from 'rxjs/operators';
import { threadId } from 'worker_threads';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Order } from '../pedidos/component/model/order';
import { PedidosService } from '../pedidos/component/service/pedidos.service';
import { Report } from './model/relatorio';
import { Transaction } from './model/transaction';
import { OrderReportService } from './service/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  percentualVendas: number = 0;
  amount: number = 0;
  ordersCount: number = 0;
  qtdUsuarios: number = 0;
  basicData: any;
  basicOptions: any;
  arrayValoresVenda: any[];
  dataNumber: number[];
  datapr: any;
  valoresGrafico: number[] = [];
  
  
  report: Report;

  constructor(private orderReportService: OrderReportService,
              private pedidosService: PedidosService){}

  ngOnInit() {

  var restaurantID = window.sessionStorage.getItem('restaurantID');

  this.orderReportService.getOrderReport(parseInt(restaurantID)).subscribe(report => {
      this.percentualVendas = report.amount / 100;
      this.amount = report.amount;
      this.ordersCount = report.ordersCount;

      this.report = report;

      this.qtdUsuarios = report.orderReports.filter(x => x.name === x.name).length;

  });

  }
}
