import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/app.service';
import { NotificationService } from 'src/app/utility/notification-service';
import { Owner } from '../model/owner';
import { OwnerService } from '../service/owner-service';

@Component({
  selector: 'app-CadastroParceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.scss']
})


export class CadastroParceiroComponent implements OnInit, OnDestroy {
 
  owner: Owner;
  cpf: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  ownerID: number;
  addressID: number;
  isOperator: boolean;
  userID: number;
  login: string;
  createdAt: Date;
  token: string;
  senha: string;

  constructor(private router: Router, 
    private ownerService: OwnerService,
    private notifyService : NotificationService,
    private ngxLoader: NgxUiLoaderService){
  }

  CadastroEstabelecimento() {

    this.owner.cpf = this.cpf;
    this.owner.password = this.password;
    this.owner.ownerID = 0;
    this.owner.name = this.name;
    this.owner.email = this.email;
    this.owner.phoneNumber = this.phoneNumber;
    this.owner.addressID = 0;
    this.owner.isOperator = true;
    this.owner.userID = 0;
    this.owner.login = "";
    this.owner.createdAt = "2021-06-09T02:27:54.266Z";
    this.owner.token = "";

    if(this.cpf === undefined ||
       this.name === undefined || 
       this.email === undefined || 
       this.phoneNumber === undefined ||
       this.senha === undefined ||
       this.cpf === '' ||
       this.name === '' || 
       this.email === '' || 
       this.phoneNumber === '' ||
       this.senha === '' ||
       this.cpf === null ||
       this.name === null || 
       this.email === null || 
       this.phoneNumber === null ||
       this.senha === null) {
      this.notifyService.showAlerta('Por favor preencha todos os campos!', 'Alerta!');
      return;
    }

    if (this.password === this.senha) {
     
      this.ngxLoader.start();
   
      this.ownerService.createOwner(this.owner).subscribe((response: Owner) => {
       
        var token = response.token.toString();
        var idOwner = response.ownerID.toString();
        console.log(token);
        window.sessionStorage.setItem('ownerID', idOwner);
        window.sessionStorage.setItem('token', token);
    
         this.router.navigate(['/cadastro-estabelecimento']);
         this.ngxLoader.stop();
        }, err => {
          this.ngxLoader.stop();
        });
  } else {
    this.notifyService.showError("As senhas não são iguais por favor digite novamente!.", "Erro!!!");
  }
}

  goBack() {
    window.history.back();
  }

  ngOnInit() {
    this.owner = new Owner();
  }

  ngOnDestroy() {
  }
}
