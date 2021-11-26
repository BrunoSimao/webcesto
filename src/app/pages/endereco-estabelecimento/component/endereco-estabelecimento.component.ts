import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Restaurant } from '../../cadastro-estabelecimento/model/restaurant';
import { EnderecoEstabelecimento } from '../model/endereco-estabelecimento';
import { EndrecoEstabelecimentoService } from '../service/endereco-estabeleciment.service';

@Component({
  selector: 'app-EnderecoEstabelecimento',
  templateUrl: './endereco-estabelecimento.component.html',
  styleUrls: ['./endereco-estabelecimento.component.scss']
})
export class EnderecoEstabelecimentoComponent implements OnInit, OnDestroy {

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


  constructor(private router: Router,
              private ngxLoader: NgxUiLoaderService,
              private enderecoEstabelecimentoService: EndrecoEstabelecimentoService){
  }

  ngOnInit() {
    this.enderecoRestaurant = new EnderecoEstabelecimento();
    this.restaurant = new Restaurant();
    this.getCurrentLocation();
  }

  salvarEnderecoEstabelecimento() {
     
    this.restaurant.address = new EnderecoEstabelecimento();
    this.restaurant.address.zipCode = this.zipCode.toString();
    this.restaurant.address.street = this.street;
    this.restaurant.address.sublocality = this.sublocality;
    this.restaurant.address.number = this.number.toString();
    this.restaurant.address.city = this.city;
    this.restaurant.address.state = this.state;
    this.restaurant.address.country ="Brasil";
    this.restaurant.address.latitude = this.latitude;
    this.restaurant.address.longitude = this.longitude;
    this.restaurant.address.observations = this.observations;

    var idRestaurant =  window.sessionStorage.getItem('restaurantID');
    this.restaurant.address.addressID = parseInt(idRestaurant);

    this.ngxLoader.start();
    this.enderecoEstabelecimentoService.salvarEnderecoEstabelecimento(this.restaurant).subscribe(res => {
      console.log(res);
      this.router.navigate(['/cadastro-conta']);
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
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
