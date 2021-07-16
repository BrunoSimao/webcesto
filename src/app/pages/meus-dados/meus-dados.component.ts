import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/utility/notification-service';
import { OwnerModel } from '../user-profile/model/owner.model';
import { UserProfileService } from '../user-profile/service/owner.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss']
})
export class MeusDadosComponent implements OnInit {

  ownerModel: OwnerModel;

  name: string;
  email: string;
  phoneNumber: string;

  constructor(private userProfileService: UserProfileService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private notifyService : NotificationService) { }

  ngOnInit() {
   this.getOwner();
  }

  getOwner() {
    var ownerID = window.sessionStorage.getItem('ownerID')
    this.ownerModel = new OwnerModel();

    this.userProfileService.getOwner(parseInt(ownerID)).subscribe((res: OwnerModel) => {
      console.log(res);
    
       this.ownerModel.name = res.name;
       this.ownerModel.email = res.email;
       this.phoneNumber = res.phoneNumber;
       this.ownerModel = res;
      console.log(this.ownerModel);
 });
}

alterarOwner(ownerModel) {
  console.log(this.name);
  this.ngxLoader.start();
  this.userProfileService.alterarOwner(ownerModel).subscribe((res: OwnerModel) => {
    console.log(res);
    this.notifyService.showSuccess('Dados do proprietário alterado!', 'Sucesso!');
    this.router.navigate(['/user-profile']);
    this.ngxLoader.stop();
}, err => {
  this.ngxLoader.stop();
});

}

goBack() {
  window.history.back();
}

}