import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { NotificationService } from 'src/app/utility/notification-service';
import { Address } from '../../cadastro-estabelecimento/model/address';
import { Rating } from '../../cadastro-estabelecimento/model/rating';
import { Restaurant } from '../../cadastro-estabelecimento/model/restaurant';
import { RestaurantCategories } from '../../cadastro-estabelecimento/model/restaurantcategories';
import { RestaurantService } from '../../cadastro-estabelecimento/service/restaurante-service';
import { UserProfileService } from '../../user-profile/service/owner.service';
import { RestaurantModel } from '../model/alterar-estabelecimento.model';


@Component({
  selector: 'app-AlterarCadastroEstComponent',
  templateUrl: './alterar-cadastro-estabelecimento.component.html',
  styleUrls: ['./alterar-cadastro-estabelecimento.component.scss'],
  providers: [MessageService]
})
export class AlterarCadastroEstComponent implements OnInit, OnDestroy {
  
  uploadedFiles: any[] = [];
  restaurantCategories: RestaurantCategories[] = [];
  selectedRestaurantCategory: RestaurantCategories;
  restaurant: Restaurant;
  selectedRest: string;
  restaurantID: number;
  companyName: string;
  phoneNumber: string;
  cnpj: string;
  token: any
  imageBase64: string;
  pedidoRetiradaBalcao: boolean = false;
  restaurantModel: RestaurantModel;
  address: Address;
  categoryRestaurant: string;
  selectedCities3: any[] = [];
  countries: any[] = [];
  //items: SelectItem[];
 
  constructor(private router: Router, private restaurantService: RestaurantService,
    private ngxLoader: NgxUiLoaderService,private messageService: MessageService,
    private userProfileService: UserProfileService,
    private notifyService : NotificationService,
    private primengConfig: PrimeNGConfig
    ){
      //this.items = [];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getRestaurantCategory();
    this.getRestaurant();
  }

  getRestaurant() {

    var prod = window.sessionStorage.getItem('restaurant');
    console.log(prod);
 
    this.restaurant = JSON.parse(prod);
    console.log(this.restaurant);

  var restaurantID = window.sessionStorage.getItem('restaurantID')
  this.restaurantModel = new RestaurantModel();


  //this.restaurantModel.restaurantCategories = this.restaurant.restaurantCategories;
  
   
 
  //this.selectedCities3.push(this.selectedRestaurantCategory);

  this.userProfileService.getRestaurant(parseInt(restaurantID)).subscribe((res: RestaurantModel) => {

    res.restaurantCategories = this.restaurant.restaurantCategories;
    console.log(res);
  
    //  this.restaurantModel.restaurantID = res.restaurantID;
    //  this.restaurantModel.companyName = res.companyName;
    //  this.restaurantModel.tradingName = res.tradingName;
    //  this.restaurantModel.phoneNumber = res.phoneNumber;
    //  this.restaurantModel.cnpj = res.cnpj;
    //  this.restaurantModel.imageURL = res.imageURL;
    
     this.restaurantModel = res;
     this.restaurantModel.restaurantCategories = this.restaurant.restaurantCategories;

    //  this.countries.push(this.restaurantModel.restaurantCategories);
    //  this.items = this.countries;
     
     this.selectedRestaurantCategory =  this.restaurantModel.restaurantCategories;
     console.log(this.selectedRestaurantCategory);

    if (res.onlyForTake) {
    this.pedidoRetiradaBalcao = true;
    }else {
      this.pedidoRetiradaBalcao = false;
    }

    console.log(this.restaurantModel);
});

    }
  

  getRestaurantCategory() {
    this.restaurantService.getRestaurantCategory().subscribe((restaurantCategories: RestaurantCategories[]) => {
      this.restaurantCategories = restaurantCategories;
    });
  }
  
  ngOnDestroy() {
  }

  alterarEstabelecimento(restaurantModel) {

    if (this.pedidoRetiradaBalcao) {
      this.restaurantModel.onlyForTake = true;
    } else {
      this.restaurantModel.onlyForTake = false;
    }

  if (this.selectedRestaurantCategory === undefined) {
    this.restaurantModel.restaurantCategories = this.restaurant.restaurantCategories;
  } else {
     this.restaurantModel.restaurantCategories = this.selectedRestaurantCategory;
  }
  
  console.log(this.restaurantModel);

  this.ngxLoader.start();
  this.userProfileService.alterarRestaurant(this.restaurantModel).subscribe((res: RestaurantModel) => {
    console.log(res);
    window.sessionStorage.setItem("restaurant", JSON.stringify(this.restaurantModel));
    window.sessionStorage.setItem("nomeRestaurante", this.restaurantModel.companyName);
    this.notifyService.showSuccess('Dados do estabelecimento alterado!', 'Sucesso!');
    this.router.navigate(['/user-profile']);
    this.ngxLoader.stop();
}, err => {
  this.ngxLoader.stop();
});
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
