import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NotificationService } from 'src/app/utility/notification-service';


@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private notifyService : NotificationService){
  }

  showToaster(){
  	this.notifyService.showSuccess("Seu cadastro está em análise, entraremos em contato assim que estiver tudo pronto.", "Sucesso!!!");
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  
  goBack() {
    window.history.back();
  }

}
