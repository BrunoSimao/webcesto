import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public nomeRestaurante: string;
  private isButtonVisible = false;
  imageURL: SafeUrl;
  image: string;
  
  constructor(location: Location,  private element: ElementRef, private router: Router, private sanitizer:DomSanitizer ) {
    this.location = location;
  }

  ngOnInit() {
    this.isButtonVisible = false;
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.nomeRestaurante = window.sessionStorage.getItem('nomeRestaurante');

    this.image = window.sessionStorage.getItem('imagemRestaurantURL');
    console.log(this.image);

    //var imageData = btoa(this.image);
   
    //this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64,"+imageData);
    this.imageURL =  (this.sanitizer.bypassSecurityTrustResourceUrl(this.image) as any).changingThisBreaksApplicationSecurity;
      console.log(this.imageURL);

  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
