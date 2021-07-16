import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Address } from '../../cadastro-estabelecimento/model/address';
import { Restaurant } from '../../cadastro-estabelecimento/model/restaurant';
import { EnderecoEstabelecimento } from '../../endereco-estabelecimento/model/endereco-estabelecimento';
import { EndrecoEstabelecimentoService } from '../../endereco-estabelecimento/service/endereco-estabeleciment.service';
import { AddressModel } from '../../user-profile/model/adress.model';
import { UserProfileService } from '../../user-profile/service/owner.service';

@Component({
  selector: 'app-AlterarEnderecoEstComponent',
  templateUrl: './alterar-endereco-estabelecimento.component.html',
  styleUrls: ['./alterar-endereco-estabelecimento.component.scss']
})
export class AlterarEnderecoEstComponent implements OnInit, OnDestroy {

  enderecoRestaurant: EnderecoEstabelecimento;
  restaurant: Restaurant;
  addressID: number;
  zipCode: string;
  street: string
  sublocality: string;  
  number: string;
  city: string;
  state: string;
  country: string;
  observations: string;
  latitude: string;
  longitude: string;

  addressModel: AddressModel;

  constructor(private router: Router,
              private ngxLoader: NgxUiLoaderService,
              private enderecoEstabelecimentoService: EndrecoEstabelecimentoService,
              private userProfileService: UserProfileService){
  }

  ngOnInit() {
    this.enderecoRestaurant = new EnderecoEstabelecimento();
    this.restaurant = new Restaurant();
    this.getCurrentLocation();
    this.getAddress();
  }

  salvarEnderecoEstabelecimento(addressModel) {
   this.addressModel.country ="Brasil";
   this.addressModel.latitude = this.latitude;
   this.addressModel.longitude = this.longitude;
   this.addressModel.number =  addressModel.number.toString();
    this.ngxLoader.start();
    this.enderecoEstabelecimentoService.alterarEnderecoEstabelecimento(this.addressModel).subscribe((res: AddressModel) => {
      console.log(res);
      this.router.navigate(['/user-profile']);
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
  }

  getAddress() {
    var addressID = window.sessionStorage.getItem('addressID')
    this.addressModel = new AddressModel();
  
      this.userProfileService.getAddress(parseInt(addressID)).subscribe(res => {
        console.log(res);
        this.addressModel = res;
        // this.addressModel.street = res.street;
         this.street = res.street;
        // this.addressModel.number = res.number;
        // this.addressModel.sublocality = res.sublocality;
         this.sublocality = res.sublocality;
        // this.addressModel.city = res.city;
         this.city = res.city;
        // this.addressModel.zipCode = res.zipCode;
         this.country = res.country
        // this.addressModel.state = res.state;
  });
  
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.latitude = position.coords.latitude.toString();
        this.longitude = position.coords.longitude.toString();
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  ngOnDestroy() {
  }

  goBack() {
    window.history.back();
  }

}
