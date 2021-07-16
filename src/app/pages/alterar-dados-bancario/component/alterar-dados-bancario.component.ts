import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/utility/notification-service';
import { Bank } from '../../cadastro-conta/model/bank';
import { BankData } from '../../cadastro-conta/model/dado-bancario';
import { BankDataService } from '../../cadastro-conta/service/dado-bancario.service';


@Component({
  selector: 'app-alterar-dados-bancario',
  templateUrl: './alterar-dados-bancario.component.html',
  styleUrls: ['./alterar-dados-bancario.component.scss']
})
export class AlterarDadosBancarioComponent implements OnInit, OnDestroy {
    
    bankData = new BankData();
    banks: Bank[];
    bank: Bank;
    selectedBank: string;
    bankCode: string;
    bankName: string;
    accountOwnerName: string;
    selectedValue: string;
    agency: string;
    accountNumber: string;
    dv: string;
    createdAt: string;
    bankAccountTypeID: number;
    selectedContaCorrente: boolean;
    selectedContaPoupanca: boolean;
    selectedValueContaSalario: boolean;


  constructor(private router: Router, private notifyService : NotificationService, private bankDataService: BankDataService, 
    private ngxLoader: NgxUiLoaderService){
  }

  ngOnInit() {
    this.getAllBanco();
    this.getdadoBancario();
    console.log(this.banks);
    this.bankData = new BankData();
  }

getdadoBancario() {
  var idOwner =  window.sessionStorage.getItem('ownerID');
  var bankDataID =  window.sessionStorage.getItem('bankDataID');
 
  this.bankDataService.getDadoBancario(parseInt(idOwner), parseInt(bankDataID)).subscribe(res => {
    console.log(res);
    this.bankData = res;
    console.log( this.bankData);

    

    if (res.bankAccountTypeID === 1) {
       this.selectedContaCorrente = true;
    } else if (res.bankAccountTypeID === 2) {
      this.selectedContaPoupanca = true;
    }else {
      this.selectedValueContaSalario = true;
    }
});

}

alterarDadoBancario() {

    console.log(this.bankData);
    this.ngxLoader.start();
    this.bankDataService.alterarDadoBancario(this.bankData).subscribe(res => {
      console.log(res);
      this.notifyService.showSuccess("Seu cadastro está em análise, entraremos em contato assim que estiver tudo pronto.", "Sucesso!!!");
      this.router.navigate(['/user-profile']);
     this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
    this.bankData = new BankData();
  }

  getAllBanco() {
    this.bankDataService.getBanco().subscribe((banks: Bank[]) => {
      this.banks = banks;
    });
  }

 
  ngOnDestroy() {
  }

  
  goBack() {
    window.history.back();
  }

}
