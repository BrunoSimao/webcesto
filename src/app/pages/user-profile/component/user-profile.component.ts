import { Component, OnInit } from '@angular/core';
import { AddressModel } from '../model/adress.model';
import { OwnerModel } from '../model/owner.model';
import { RestaurantModel } from '../model/restaurant.model';
import { UserProfileService } from '../service/owner.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  ownerModel: OwnerModel;
  addressModel: AddressModel;
  nameUsuario: string;
  restaurantModel: RestaurantModel;
  cnpj: string;
  companyName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  sublocality: string;
  country: string;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.getOwner();
    this.getAdress();
    this.getRestaurant();
  }

  getOwner() {
    var ownerID = window.sessionStorage.getItem('ownerID')
    this.ownerModel = new OwnerModel();

    this.userProfileService.getOwner(parseInt(ownerID)).subscribe(res => {
      console.log(res);
      this.ownerModel.name = res.name;
      this.ownerModel.email = res.email;
      this.ownerModel.phoneNumber = res.phoneNumber;
      this.ownerModel.cpf = res.cpf;
  });
}

Teste(ownerModel) {
  console.log(ownerModel);
}

getAdress() {
  var addressID = window.sessionStorage.getItem('addressID')
  this.addressModel = new AddressModel();

    this.userProfileService.getAddress(parseInt(addressID)).subscribe(res => {
      console.log(res);
      this.addressModel.street = res.street;
      this.street = res.street;
      this.addressModel.number = res.number;
      this.addressModel.sublocality = res.sublocality;
      this.sublocality = res.sublocality;
      this.addressModel.city = res.city;
      this.city = res.city;
      this.addressModel.zipCode = res.zipCode;
      this.country = res.country
      this.state = res.state;
});

}

 getRestaurant() {
  var restaurantID =window.sessionStorage.getItem('restaurantID')
  //this.restaurantModel = new RestaurantModel();

    this.userProfileService.getRestaurant(parseInt(restaurantID)).subscribe(res => {
      console.log(res);
      this.cnpj = res.cnpj;
      this.companyName = res.companyName;
      this.phoneNumber = res.phoneNumber;
   });
  }
}
