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
  imageURL: string;
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
    
    this.imageURL = this.b64DecodeUnicode(this.image);
   
    console.log(this.imageURL);

 
    //this.adicionarImg(this.image);
    //this.imageURL = btoa(this.image);
    //this.imageURL = this.b64DecodeUnicode(this.image);
    //var imageData = btoa(this.image);
    //this.imageURL = btoa(unescape(encodeURIComponent(this.image)));
    //this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64,"+this.image);
    //this.imageURL =  (this.sanitizer.bypassSecurityTrustResourceUrl(this.image) as any).changingThisBreaksApplicationSecurity;
   
      //this.handleReaderLoaded(this);

  }

  adicionarImg(imagem) {
   document.querySelector('img').src = "data:image/png;base64, "+ imagem;

  //  var imagee = document.querySelector('img');
  //  imagee.src = "data:image/png;base64,"+ imagem;

  //  imagee.width=100;
  //  imagee.height=100;
  //  imagee.alt="here should be some image";
    
  //  document.body.appendChild(imagee);
   
 }

  
 b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
  

  handleReaderLoaded(e) {
    //this.uploadedFiles.push(btoa(e.target.result));
    this.imageURL = btoa(e.image);
    console.log(btoa(e.image));
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
