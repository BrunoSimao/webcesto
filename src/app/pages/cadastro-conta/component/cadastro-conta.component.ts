import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NotificationService } from 'src/app/utility/notification-service';
import { BankData } from '../model/dado-bancario';
import { BankDataService } from '../service/dado-bancario.service';


@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit, OnDestroy {
    
    bank = new BankData();
    bankCode: string;
    bankName: string;
    accountOwnerName: string;
    agency: string;
    accountNumber: string;
    dv: string;
    createdAt: string;
    bankAccountTypeID: number;
  constructor(private router: Router, private notifyService : NotificationService, private bankDataService: BankDataService){
  }

  confirmaDadosBancario(){

    this.bank.bankCode = "341";
    this.bank.bankName = "Itaú";
    this.bank.agency = "Itaú";
    this.bank.accountNumber = "32435343";
    this.bank.dv = "7";
    this.bank.bankAccountTypeID = 1;

    console.log(this.bank);

    this.bankDataService.createBankData(this.bank).subscribe(() => {
      this.notifyService.showSuccess("Seu cadastro está em análise, entraremos em contato assim que estiver tudo pronto.", "Sucesso!!!");
      this.router.navigate(['/login']);
    });
    this.bank = new BankData();
  }

  ngOnInit() {
    this.bank = new BankData();
  }
  ngOnDestroy() {
  }

  
  goBack() {
    window.history.back();
  }

}
