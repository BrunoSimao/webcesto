import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { element } from 'protractor';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
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

  constructor(private orderReportService: OrderReportService){}

  ngOnInit() {

  //  this.datasets = [
  //     [0, 20, 10, 30, 15, 40, 20, 60, 60],
  //     [0, 20, 5, 25, 10, 30, 15, 40, 40]
  //   ];

  var restaurantID = window.sessionStorage.getItem('restaurantID');

  this.orderReportService.getOrderReport(parseInt(restaurantID)).subscribe(report => {
      this.percentualVendas = report.amount / 100;
      this.amount = report.amount;
      this.ordersCount = report.ordersCount;

      
      this.report = report;

      this.qtdUsuarios = report.orderReports.filter(x => x.name === x.name).length;

      // report.orderReports.forEach(element => {
      //  var teste =  report.orderReports.filter(x => x.name);
      //  this.qtdUsuarios = teste.length;
      // })

  });

  // this.orderReportService.getTransacao(parseInt(restaurantID)).subscribe((response: Transaction[]) => {
  //   console.log(response);
  //   this.datasets = [] = [];

  //   response.forEach(element => {
  //    var Xmas95 = new Date(element.createdAt);
  //    var month = Xmas95.getMonth();
  //    month +=1;
  //    console.log(month); 

  //    if (month === 6) {
  //             element.amount += element.amount;
  //             this.datasets[0] = element.amount;
  //           } if (month === 7) {
  //             element.amount += element.amount;
  //             this.datasets[1] = element.amount;
  //           }
  //   });
//});

    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
   // this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });

   

    // this.orderReportService.getTransacao(parseInt(restaurantID)).subscribe((response: Transaction[]) => {
    //      console.log(response);

    //      response.forEach(element => {
    //       var Xmas95 = new Date(element.createdAt);
    //       var month = Xmas95.getMonth();
    //       month +=1;
    //       console.log(month); 

    //       if (month === 6) {
    //         element.amount += element.amount;
    //         this.datasets.push(element.amount);
    //       } if (month === 7) {
    //         element.amount += element.amount;
    //         this.datasets.push(element.amount);
    //       }

    //      });
    // });

  }


  // public updateOptions() {
  //   this.salesChart.data.datasets[0].data = this.data;
  //   this.salesChart.update();
  // }

}
