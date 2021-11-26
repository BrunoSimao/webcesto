import { Component, OnInit } from '@angular/core';
import { OrderReports } from '../dashboard/model/order-reports';
import { Report } from '../dashboard/model/relatorio';
import { OrderReportService } from '../dashboard/service/report.service';
import { ExportarRelatorio } from './exportar-relatorio';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public copy: string;
  report: Report;
  orderReports: OrderReports[];
  cols: any[];
  exportarRelatorios: ExportarRelatorio[] = [];
  exportarRelatorio: ExportarRelatorio;
    exportColumns: any[];

  constructor(private reportService: OrderReportService) { }

  ngOnInit() {
    this.getRelatorio();
  }

  getRelatorio() {
     var restaurantID = window.sessionStorage.getItem('restaurantID');
     this.reportService.getOrderReport(parseInt(restaurantID)).subscribe(res => {
         this.report = res;
         this.orderReports = res.orderReports;
        
         this.exportarRelatorios = new Array<ExportarRelatorio>();
         console.log(this.orderReports);
        
         this.orderReports.forEach(element => {
           this.exportarRelatorio = new ExportarRelatorio();
           this.exportarRelatorio.OrderID = element.orderID;
           this.exportarRelatorio.Nome = element.name;
           this.exportarRelatorio.TempoAtendimento = element.preparation;
           this.exportarRelatorio.Valor = element.amount;

           this.exportarRelatorios.push(this.exportarRelatorio);
         })

         console.log(this.exportarRelatorios);
         
        this.cols = [
          { field: 'Usuário', header: 'Usuário' },
          { field: 'ID/Mesa', header: 'ID/Mesa' },
          { field: 'Tempo Atendimento', header: 'Tempo Atendimento' },
          { field: 'Valor', header: 'Valor' }
      ];

      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

     });  
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.exportarRelatorios);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

}
