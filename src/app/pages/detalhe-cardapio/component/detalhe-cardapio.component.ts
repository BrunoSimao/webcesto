import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';;
import { NotificationService } from 'src/app/utility/notification-service';
import { Product } from '../../pedidos/component/model/product';
import { ProductCategory } from '../../pedidos/component/model/product-category';
import { DetalheCardapioService } from '../service/detalhe-cardapio.service';

@Component({
  selector: 'app-detalhe-cardapio',
  templateUrl: './detalhe-cardapio.component.html',
  styleUrls: ['./detalhe-cardapio.component.scss']
})
export class DetalheCardapioComponent implements OnInit, OnDestroy {

  uploadedFiles: any[] = [];
  produto: Product;
  productCategories: ProductCategory[];
  imageBase64: string;
  discountOptions: any[];
  value: any;
  productsCategories: ProductCategory[];
  selectedProductCategory: ProductCategory;
  customSwitches: string;
  produtoDisponivel: boolean = false;
  checked1: boolean = false;

  constructor(private router: Router,
    private detalheCardapioService: DetalheCardapioService,
    private notifyService : NotificationService,
    private ngxLoader: NgxUiLoaderService){

    this.discountOptions = [
      {name: '3%', value: 3},
      {name: '5%', value: 5},
      {name: '10%', value: 10},
      {name: '25%', value: 25},
      {name: '30%', value: 30},
      {name: '40%', value: 40}
  ];
  }

  ngOnInit() {
   var prod = window.sessionStorage.getItem('produto');
   console.log(prod);

   this.produto = JSON.parse(prod);
   console.log( this.produto);

   if (this.produto.stockLevel === 1) {
    this.produtoDisponivel = true;
    }else {
      this.produtoDisponivel = false;
    }

   this.getProductCategory();
  }

  salvarCardapio() {
    
    if (this.selectedProductCategory === undefined && this.produto.productCategory === null){
      this.notifyService.showAlerta('Por favor selecione a categoria!', 'Alerta!');
      return;
    }else {
      this.produto.productCategories.categoryDescription = this.selectedProductCategory === undefined ? this.produto.productCategory : this.selectedProductCategory.categoryDescription;
    }

    if(this.produto.name === undefined ||
      this.produto.price === undefined || 
      this.produto.description === undefined || 
      this.produto.productCategories.categoryDescription === undefined ||
      this.produto.name === '' ||
      this.produto.price.toString() === '' || 
      this.produto.description === '' || 
      this.produto.productCategories.categoryDescription === '' ||
      this.produto.name === null ||
      this.produto.price === null || 
      this.produto.description === null || 
      this.produto.productCategories.categoryDescription === null) {
     this.notifyService.showAlerta('Por favor preencha todos os campos!', 'Alerta!');
     return;
   } else {
     
    if (this.produtoDisponivel) {
      this.produto.stockLevel = 1;
    } else {
      this.produto.stockLevel = 0;
    }
    
    this.produto.imageURL = this.imageBase64 === undefined ? this.produto.imageURL : this.imageBase64;
  
    this.ngxLoader.start();
    console.log(this.value);

    if (this.value === undefined){
      this.produto.discount = 0;
    } else {
      this.produto.discount = ((this.value * this.produto.price / 100));
    }
   
    this.detalheCardapioService.alterarProduto(this.produto).subscribe(response => {
       console.log(response);
      this.notifyService.showSuccess('Produto alterado!', 'Sucesso!');
       this.router.navigate(['/cardapio']);
       this.ngxLoader.stop();
   }, err => {
     this.ngxLoader.stop();
   });
    console.log(this.produto);
     }
  }

  getProductCategory() {
    this.detalheCardapioService.getProductCategory().subscribe((productsCategories: ProductCategory[]) => {
      this.productsCategories = productsCategories;
    });
  }

  ngOnDestroy() {
  }
  
  onFileChanged(event) {
    const file = event.target.files[0]
  }

  ExcluirCardapio(){
    this.ngxLoader.start();
    this.detalheCardapioService.deletarProduto(this.produto.prodID).subscribe(response => {
       console.log(response);
       this.notifyService.showSuccess('Produto foi excluido!', 'Sucesso!');
       this.router.navigate(['/cardapio']);
       this.ngxLoader.stop();
   }, err => {
     this.ngxLoader.stop();
   });
  }

  mudaBotao(){
    window.document.getElementById("botao").style.color = "#0000FF";
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
