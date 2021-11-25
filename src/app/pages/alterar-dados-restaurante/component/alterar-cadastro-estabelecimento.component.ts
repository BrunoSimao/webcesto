import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';
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
  selectedRestaurantCategory: RestaurantCategories[] = [];
  restaurant: Restaurant;
  selectedRest: string;
  restaurantID: number;
  companyName: string;
  phoneNumber: string;
  cnpj: string;
  token: any
  imageBase64: string;
  pedidoRetiradaBalcao: boolean = false;
  restaurantModel: Restaurant;
  address: Address;
  categoryRestaurant: string;
  selectedCities3: any[] = [];
  countries: any[] = [];
  selectedItem: any = [];
  dropdownSettings = {};
  myimage: Observable<any>;
 
  constructor(private router: Router, private restaurantService: RestaurantService,
    private ngxLoader: NgxUiLoaderService,private messageService: MessageService,
    private userProfileService: UserProfileService,
    private notifyService : NotificationService,
    private primengConfig: PrimeNGConfig
    ){
      //this.items = [];
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'restaurantCategoryID',
      textField: 'categoryDescription',
      selectAllText: 'Selecione Todos',
      unSelectAllText: 'Desmarque Todos',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false
    };

    
    this.primengConfig.ripple = true;
    this.getRestaurantCategory();
    this.getRestaurant();
  }

  onItemSelect(item: RestaurantCategories) {
    console.log(item);
  }
  onSelectAll(items: RestaurantCategories) {
    console.log(items);
  }
  
  getRestaurant() {

    var prod = window.sessionStorage.getItem('restaurant');
    console.log(prod);
 
    this.restaurant = JSON.parse(prod);
    console.log(this.restaurant);

    //res.restaurantCategories = this.restaurant.restaurantCategories;
    //console.log(res);
    
     //this.restaurantModel = res;
    // this.restaurantModel.restaurantCategories = this.restaurant.restaurantCategories;

    //  this.countries.push(this.restaurantModel.restaurantCategories);
    //  this.items = this.countries;
     
     this.selectedRestaurantCategory =  this.restaurant.restaurantCategories;
     console.log(this.selectedRestaurantCategory);

    // if (restaurant.onlyForTake) {
    // this.pedidoRetiradaBalcao = true;
    // }else {
    //   this.pedidoRetiradaBalcao = false;
    // }

    console.log(this.restaurant);

  //var restaurantID = window.sessionStorage.getItem('restaurantID')
  //this.restaurantModel = new Restaurant();


  //this.restaurantModel.restaurantCategories = this.restaurant.restaurantCategories;
  
   
 
  //this.selectedCities3.push(this.selectedRestaurantCategory);

//   this.userProfileService.getRestaurant(parseInt(restaurantID)).subscribe((res: Restaurant) => {

//     // res.restaurantCategories = this.restaurant.restaurantCategories;
//     // console.log(res);
    
//     //  this.restaurantModel = res;
//     //  this.restaurantModel.restaurantCategories = this.restaurant.restaurantCategories;

//     // //  this.countries.push(this.restaurantModel.restaurantCategories);
//     // //  this.items = this.countries;
     
//     //  this.selectedRestaurantCategory =  this.restaurantModel.restaurantCategories;
//     //  console.log(this.selectedRestaurantCategory);

//     // if (res.onlyForTake) {
//     // this.pedidoRetiradaBalcao = true;
//     // }else {
//     //   this.pedidoRetiradaBalcao = false;
//     // }

//     // console.log(this.restaurantModel);
// });

    }
  

  getRestaurantCategory() {
    this.restaurantService.getRestaurantCategory().subscribe((restaurantCategories: RestaurantCategories[]) => {
      this.restaurantCategories = restaurantCategories;
    });
  }
  
  ngOnDestroy() {
  }

  alterarEstabelecimento(restaurant) {

    if (this.pedidoRetiradaBalcao) {
      this.restaurant.onlyForTake = true;
    } else {
      this.restaurant.onlyForTake = false;
    }

  if (this.selectedRestaurantCategory === undefined) {
    this.restaurant.restaurantCategories = this.restaurant.restaurantCategories;
  } else {
     this.restaurant.restaurantCategories = this.selectedRestaurantCategory;
  }
  
  console.log(this.restaurant);

  this.ngxLoader.start();
  this.userProfileService.alterarRestaurant(this.restaurant).subscribe((res: Restaurant) => {
    console.log(res);
   
    window.sessionStorage.setItem("restaurant", JSON.stringify(res));
    window.sessionStorage.setItem("nomeRestaurante", this.restaurant.companyName);
    window.sessionStorage.setItem("imagemRestaurantURL", this.restaurant.imageURL);
    this.notifyService.showSuccess('Dados do estabelecimento alterado!', 'Sucesso!');
    this.router.navigate(['/user-profile']);
    this.ngxLoader.stop();
}, err => {
  this.ngxLoader.stop();
});
  }

  onUpload(event) {
    const file = event.files[0];
   
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      console.log(this.myimage);
      
      this.readFile(file, subscriber);
    });
    this.myimage.subscribe((d) => {
     console.log(d);

     d = d.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
     
     this.restaurant.imageURL = d;
    console.log(this.restaurant.imageURL)
    })
  }

  
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  
  goBack() {
    window.history.back();
  }
}
