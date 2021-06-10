import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
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
 
  constructor(private router: Router, private ownerService: OwnerService){
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

    console.log(this.owner);
    this.ownerService.createOwner(this.owner).subscribe(() => {
      this.router.navigate(['/cadastro-estabelecimento']);
    });
    this.owner = new Owner();
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
