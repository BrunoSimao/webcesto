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

 report: Report;

  constructor(private orderReportService: OrderReportService){}

  ngOnInit() {

  //   this.basicData = {
  //     labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  //     datasets: [
  //         {
  //             label: 'My First dataset',
  //             backgroundColor: '#42A5F5',
  //             data: [65, 59, 80, 81, 56, 55, 40]
  //         }
  //         // {
  //         //     label: 'My Second dataset',
  //         //     backgroundColor: '#FFA726',
  //         //     data: [28, 48, 40, 19, 86, 27, 90]
  //         // }
  //     ]
  // };

   this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60]//,
     // [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];

  var restaurantID = window.sessionStorage.getItem('restaurantID');

  this.orderReportService.getOrderReport(parseInt(restaurantID)).subscribe((report: Report) => {
      this.percentualVendas = report.amount / 100;
      this.amount = report.amount;
      this.ordersCount = report.ordersCount;

      report.orderReports.forEach(element => {
       var teste =  report.orderReports.filter(x => x.name);
       this.qtdUsuarios = teste.length;
      })
  });

  this.orderReportService.getTransacao(parseInt(restaurantID)).subscribe((response: Transaction[]) => {
    console.log(response);
    this.datasets = [] = [];

    response.forEach(element => {
     var Xmas95 = new Date(element.createdAt);
     var month = Xmas95.getMonth();
     month +=1;
     console.log(month); 

     if (month === 6) {
              element.amount += element.amount;
              this.datasets[0] = element.amount;
            } if (month === 7) {
              element.amount += element.amount;
              this.datasets[1] = element.amount;
            }
    });
});

// for (let i = 0; i < 12; i++) {
//  this.datasets.push(i);
// }

    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60]//,
    //  // [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});

   

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


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
