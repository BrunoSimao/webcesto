import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from 'src/app/app.service';
import { Address } from '../model/address';
import { Rating } from '../model/rating';
import { Restaurant } from '../model/restaurant';
import { RestaurantCategories } from '../model/restaurantcategories';
import { RestaurantService } from '../service/restaurante-service';

@Component({
  selector: 'app-CadastroEstabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss'],
  providers: [MessageService]
})
export class CadastroEstabelecimentoComponent implements OnInit, OnDestroy {
  
  uploadedFiles: any[] = [];
  restaurantCategories: RestaurantCategories[];
  selectedRestaurantCategory: RestaurantCategories;
  restaurant: Restaurant;
  restaurantID: number
  companyName: string;
  phoneNumber: string;
  cnpj: string;
  token: any
  imageBase64: string;
 
  constructor(private router: Router, private restaurantService: RestaurantService,
    private ngxLoader: NgxUiLoaderService,private messageService: MessageService){
  }

  ngOnInit() {
    this.restaurant = new Restaurant();
    this.getRestaurantCategory();
  }

  getRestaurantCategory() {
    this.restaurantService.getRestaurantCategory().subscribe((restaurantCategories: RestaurantCategories[]) => {
      this.restaurantCategories = restaurantCategories;
    });
  }
  
  ngOnDestroy() {
  }

  CadastroDadosBancario() {

    var idOwner =  window.sessionStorage.getItem('ownerID');
    this.restaurant.ownerID = parseInt(idOwner);
    this.restaurant.companyName = this.companyName;
    this.restaurant.tradingName = this.companyName;;
    this.restaurant.phoneNumber = this.phoneNumber;
    this.restaurant.cnpj = this.cnpj;
    this.restaurant.imageURL = this.imageBase64;
     
    // this.restaurant.restaurantCategories = new RestaurantCategories();
    // this.restaurant.restaurantCategories.restaurantCategoryID = this.selectedRestaurantCategory.restaurantCategoryID;
    
    // this.restaurant.restaurantID = 0;
    
    // this.restaurant.addressID = 0;

    // this.restaurant.address = new Address();
    // this.restaurant.address.addressID = 0;
    // this.restaurant.address.zipCode = null;
    // this.restaurant.address.street = null;
    // this.restaurant.address.street = null;
    // this.restaurant.address.number = null;
    // this.restaurant.address.city = null;
    // this.restaurant.address.state = null;
    // this.restaurant.address.country = null;
    // this.restaurant.address.longitude = null;
    // this.restaurant.address.observations = null;
    // this.restaurant.restaurantCategories.restaurantCategoryID = 0;
    // this.restaurant.restaurantCategories.categoryDescription = null;
    // this.restaurant.restaurantCategories.color = null;
    // this.restaurant.createdAt = null;
    // this.restaurant.categoriesFormatted = null;
    // this.restaurant.distance = 0;
    // this.restaurant.distanceFormatted = null;
    // this.restaurant.preparationTime = 0;
    // this.restaurant.attending = true;
    // this.restaurant.onlyForTake = true;
    // this.restaurant.onBehalfOf = null;
    // this.restaurant.attending = true;
    // this.restaurant.rating = new Rating();
    // this.restaurant.rating.rate = 0;
    // this.restaurant.rating.count = 0;
   
    console.log(this.restaurant);
    this.ngxLoader.start();
    this.restaurantService.createRestaurant(this.restaurant).subscribe(response => {

     // window.sessionStorage.setItem("responseRestaurant", JSON.stringify(response));
      window.sessionStorage.setItem('restaurantID', response.restaurantID.toString())
      
      this.router.navigate(['/endereco-estabelecimento']);
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
      
    this.restaurant = new Restaurant();
  }

  onUpload(event) {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsArrayBuffer(file);
  }
}

  handleReaderLoaded(e) {
    this.uploadedFiles.push(btoa(e.target.result));
    this.imageBase64 = btoa(e.target.result);
    console.log(btoa(e.target.result));
  }
  
  goBack() {
    window.history.back();
  }
}
