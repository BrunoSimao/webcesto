import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { Address } from '../model/address';
import { Rating } from '../model/rating';
import { Restaurant } from '../model/restaurant';
import { RestaurantCategories } from '../model/restaurantcategories';
import { RestaurantService } from '../service/restaurante-service';

@Component({
  selector: 'app-CadastroEstabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss']
})
export class CadastroEstabelecimentoComponent implements OnInit, OnDestroy {

  restaurant: Restaurant;
  restaurantCategories: RestaurantCategories;
  restaurantID: number
  companyName: string;
  phoneNumber: string;
  cnpj: string;
 
  constructor(private router: Router, private restaurantService: RestaurantService){
  }

  ngOnInit() {
    this.restaurant = new Restaurant();
    this.restaurantCategories = new RestaurantCategories();
  }
  ngOnDestroy() {
  }

  CadastroDadosBancario() {
    this.restaurant.restaurantID = 0;
    this.restaurant.ownerID = 0;
    this.restaurant.addressID = 0;
    this.restaurant.companyName = this.companyName;
    this.restaurant.phoneNumber = this.phoneNumber;
    this.restaurant.cnpj = this.cnpj;
    this.restaurantCategories.categoryDescription = 'Brasileira';
    this.restaurant.restaurantCategories = this.restaurantCategories;
    this.restaurant.address = new Address();
    this.restaurant.rating = new Rating();
   
    console.log(this.restaurant);
    this.restaurantService.createRestaurant(this.restaurant).subscribe(() => {
      this.router.navigate(['/cadastro-conta']);
    });
    this.restaurant = new Restaurant();
  }

  
  goBack() {
    window.history.back();
  }
}
