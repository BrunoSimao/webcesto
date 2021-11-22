import { Component, ElementRef, OnInit, Pipe, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { element } from 'protractor';
import { Product } from '../../pedidos/component/model/product';
import { CardapioService } from '../service/cardapio.service';


@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})

export class CardapioComponent implements OnInit {

  src:string;
  productCategory: string;
  products: Product[];
  produto: Product;
  imagemPath: string;
  restaurantID: string;
  filterTerm: string;
  isButtonVisible = false;
  base64textString: string;
  base64Image: string;
  imagem: string;
  //genuineURL: SafeUrl;
  currVerifiedLoanOfficerPhoto: string;

 
  constructor(private router: Router, 
    private cardapioService: CardapioService,
    private ngxLoader: NgxUiLoaderService,
    private sanitizer:DomSanitizer ) { 

    

// const mediaType = 'data:image/png;base64,';
// const blob = new Blob([this.products[0].imageURL],  { type: mediaType });
// const unsafeImg = URL.createObjectURL(blob);
// this.genuineURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeImg);

    }

  ngOnInit() {
    this.isButtonVisible = true;
    this.restaurantID = window.sessionStorage.getItem('restaurantID');
    this.ngxLoader.start();
    this.getProdutos();
    this.ngxLoader.stop();
    this.produto = new Product();
  }

  cadastroCardapio() {
    this.router.navigate(['/cadastro-cardapio']);
  }



  getProdutos() {
    this.cardapioService.getProdutos(this.restaurantID).subscribe(prod => {
      console.log(prod);
      this.products = prod; 
      
      this.products.forEach(element => {
        //console.log(element.imageURL);
        console.log(element.imageURL);
       // this.produto.imageURL = element.imageURL;
       
       element.imageURL = this.b64DecodeUnicode(element.imageURL);
        //  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' 
        // +  element.imageURL);
        //this.imagem = btoa(element.imageURL); //element.imageURL;


       // var imageData = btoa(element.imageURL);
        //console.log("Base64 Image: ",imageData);

        //var imageData = btoa(element.imageURL);
        //console.log("Base64 Image: ",imageData);
        //this.imagem = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64,"+ this.imagem );
       
        //this.imagem = this.sanitizer.bypassSecurityTrustUrl(element.imageURL);
        //this.imagem =  (this.sanitizer.bypassSecurityTrustUrl(element.imageURL) as any).changingThisBreaksApplicationSecurity;
      

        // this.genuineURL = this.sanitizer.bypassSecurityTrustUrl(this.imagem); 
        // this.currVerifiedLoanOfficerPhoto = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(element.imageURL) as any).changingThisBreaksApplicationSecurity;
        //this.transform(this.imagem);
      
      })

      this.products.sort((a, b) => { 
        if (a.productCategory < b.productCategory) {
          return -1;
        }
  }); 
  }, err => {
    
  });
  }

 b64DecodeUnicode(str) {
   return decodeURIComponent(atob(str));
 }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
     }

  onClick(prod: Product) { 
      window.sessionStorage.setItem("produto", JSON.stringify(prod));
      this.router.navigate(['/detalhe-cardapio', prod.prodID]);
      console.log('Click!', prod) 
  } 

}

