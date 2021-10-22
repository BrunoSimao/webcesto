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

@Pipe({ name: 'safe' })

export class CardapioComponent implements OnInit {

  src:string;
  productCategory: string;
  products: Product[];
  imagemPath: string;
  restaurantID: string;
  filterTerm: string;
  isButtonVisible = false;
  base64textString: string;
  base64Image: string;
  imagem: SafeUrl;
  //genuineURL: SafeUrl;
  currVerifiedLoanOfficerPhoto: string;
  

  @ViewChild('imgRef') img:ElementRef;
 
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
  }

  cadastroCardapio() {
    this.router.navigate(['/cadastro-cardapio']);
  }



  getProdutos() {
    this.cardapioService.getProdutos(this.restaurantID).subscribe(products => {
      console.log(products);
      this.products = products; 
      
      this.products.forEach(element => {
        console.log(element.imageURL);

       
     
        //  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' 
        // +  element.imageURL);
        //this.imagem = btoa(element.imageURL); //element.imageURL;


       // var imageData = btoa(element.imageURL);
        //console.log("Base64 Image: ",imageData);

        //var imageData = btoa(element.imageURL);
        //console.log("Base64 Image: ",imageData);
        this.imagem = this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64,"+element.imageURL);

        //this.imagem = this.sanitizer.bypassSecurityTrustUrl(element.imageURL);
        //this.imagem =  (this.sanitizer.bypassSecurityTrustUrl(element.imageURL) as any).changingThisBreaksApplicationSecurity;
      

        // this.genuineURL = this.sanitizer.bypassSecurityTrustUrl(this.imagem); 
        // this.currVerifiedLoanOfficerPhoto = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(element.imageURL) as any).changingThisBreaksApplicationSecurity;
        //this.transform(this.imagem);
        console.log(this.imagem);
      })

      
      
      this.products.sort((a, b) => { 
        if (a.productCategory < b.productCategory) {
          return -1;
        }
  }); 
  }, err => {
    
  });
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
     }

  // encodeImageFileAsURL() {

  //   var filesSelected = document.getElementById("inputFileToLoad").files;
  //   if (filesSelected.length > 0) {
  //     var fileToLoad = filesSelected[0];

  //     var fileReader = new FileReader();

  //     fileReader.onload = function(fileLoadedEvent) {
  //       var srcData = fileLoadedEvent.target.result; // <--- data: base64

  //       var newImage = document.createElement('img');
  //       newImage.src = srcData;

  //       document.getElementById("imgTest").innerHTML = newImage.outerHTML;
  //       alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
  //       console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
  //     }
  //     fileReader.readAsDataURL(fileToLoad);
  //   }
  // }


  onClick(prod: Product) { 
      window.sessionStorage.setItem("produto", JSON.stringify(prod));
      this.router.navigate(['/detalhe-cardapio']);
      console.log('Click!', prod) 
  } 

}

