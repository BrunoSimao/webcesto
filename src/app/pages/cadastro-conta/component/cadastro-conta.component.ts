import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/utility/notification-service';
import { Bank } from '../model/bank';
import { BankData } from '../model/dado-bancario';
import { BankDataService } from '../service/dado-bancario.service';


@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit, OnDestroy {
    
    bankData = new BankData();
    banks: Bank[];
    bank: Bank;
    selectedBank: Bank;
    bankCode: string;
    bankName: string;
    accountOwnerName: string;
    selectedValue: string;
    agency: string;
    accountNumber: string;
    dv: string;
    createdAt: string;
    bankAccountTypeID: number;

  constructor(private router: Router, private notifyService : NotificationService, private bankDataService: BankDataService, 
    private ngxLoader: NgxUiLoaderService){
  }

  confirmaDadosBancario() {

    var idOwner =  window.sessionStorage.getItem('ownerID');
    this.bankData.ownerID = parseInt(idOwner);
    this.bankData.bankCode = this.selectedBank.code;
    this.bankData.bankName = this.selectedBank.bankName;
    this.bankData.agency =this.agency;
    this.bankData.accountNumber = this.accountNumber.toString();
    this.bankData.dv = this.dv.toString();
    this.bankData.accountOwnerName = this.accountOwnerName;
    this.bankData.bankAccountTypeID = parseInt(this.selectedValue);
   
    console.log(this.bankData);
    this.ngxLoader.start();
    this.bankDataService.createBankData(this.bankData).subscribe(res => {
      console.log(res);
      this.notifyService.showSuccess("Seu cadastro está em análise, entraremos em contato assim que estiver tudo pronto.", "Sucesso!!!");
      this.router.navigate(['/login']);
     this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
    this.bankData = new BankData();
  }

  getBanco() {
    this.bankDataService.getBanco().subscribe((banks: Bank[]) => {
      this.banks = banks;
    });
  }

  ngOnInit() {
    this.getBanco();
    console.log(this.banks);
    this.bankData = new BankData();
  }
  ngOnDestroy() {
  }

  
  goBack() {
    window.history.back();
  }

}
