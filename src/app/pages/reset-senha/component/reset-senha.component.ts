import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResetRequestOwner } from '../model/reset-request-owner';
import { ResetRequestOwnerService } from '../service/reset-request-owner.service';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent implements OnInit, OnDestroy {

  resetOwner: ResetRequestOwner;
  email: string;

  constructor(private router: Router,
              private resetOwnerService: ResetRequestOwnerService,
              private ngxLoader: NgxUiLoaderService){
  }

  ngOnInit() {
    this.resetOwner = new ResetRequestOwner();
  }
  ngOnDestroy() {
  }

  goBack() {
    window.history.back();
  }

  ValidaResetSenha() {

    this.resetOwner.email = this.email;
    this.ngxLoader.start();
    console.log(this.resetOwner);
    this.resetOwnerService.resetOwner(this.resetOwner).subscribe(() => {
      this.ngxLoader.stop();
      this.router.navigate(['/valida-reset-senha']);
    });
    
    this.resetOwner = new ResetRequestOwner();
   
  }
}
