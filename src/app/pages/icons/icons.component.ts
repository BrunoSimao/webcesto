import { Component, OnInit } from '@angular/core';
import { OrderReports } from '../dashboard/model/order-reports';
import { Report } from '../dashboard/model/relatorio';
import { OrderReportService } from '../dashboard/service/report.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public copy: string;
  report: Report;
  orderReports: OrderReports[];

  constructor(private reportService: OrderReportService) { }

  ngOnInit() {
    this.getRelatorio();
  }

  getRelatorio() {
     var restaurantID = window.sessionStorage.getItem('restaurantID');
     this.reportService.getOrderReport(parseInt(restaurantID)).subscribe(res => {
         this.report = res;
         this.orderReports = res.orderReports;

     });  
  }
}
