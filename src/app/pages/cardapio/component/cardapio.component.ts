import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  imagemPath: string;
  restaurantID: string;
  filterTerm: string;
  isButtonVisible = false;
  base64textString: string;
  base64Image: string;

  @ViewChild('imgRef') img:ElementRef;
 
  constructor(private router: Router, 
    private cardapioService: CardapioService,
    private ngxLoader: NgxUiLoaderService,
    private sanitizer:DomSanitizer ) { }

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

      // this.products.forEach(element => {
      //   console.log(element.imageURL);
      // })
      
      this.products.sort((a, b) => { 
        if (a.productCategory < b.productCategory) {
          return -1;
        }
  }); 
  }, err => {
    
  });
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

