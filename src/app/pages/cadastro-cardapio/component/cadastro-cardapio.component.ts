import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';import { Observable, Subscriber } from 'rxjs';
;
import { NotificationService } from 'src/app/utility/notification-service';
import { ProductCategory } from '../../detalhe-cardapio/model/product-category';
import { DetalheCardapioService } from '../../detalhe-cardapio/service/detalhe-cardapio.service';
import { Product } from '../../pedidos/component/model/product';
import { ProductStatus } from '../../pedidos/component/model/product-status';
import { ProdutoModel } from '../model/produto.model';
import { CadastroCardapioService } from '../service/cadastro-cardapio.service';



@Component({
  selector: 'app-cadastro-cardapio',
  templateUrl: './cadastro-cardapio.component.html',
  styleUrls: ['./cadastro-cardapio.component.scss']
})
export class CadastroCardapioComponent implements OnInit, OnDestroy {

  uploadedFiles: any[] = [];
  produto: ProdutoModel;
  productCategories: ProductCategory[];
  imageBase64: string;
  discountOptions: any[];
  value: any;
  productsCategories: ProductCategory[];
  selectedProductCategory: ProductCategory;
  customSwitches: string;
  produtoDisponivel: boolean = false;
  checked1: boolean = false;

  name: string;
  description: string;
  price: number;
  myimage: Observable<any>;
  
  constructor(private router: Router,
    private cadastroCardapioService: CadastroCardapioService,
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
   this.produto = new ProdutoModel();
   this.getProductCategory();
  }

  salvarCardapio() {
   
    this.produto.productCategories = new Array<ProductCategory>();
    this.produto.productCategories.push(this.selectedProductCategory);
    this.produto.productStatus = new ProductStatus();

    if (this.description.length > 5) {
      this.notifyService.showAlerta('Por favor a descrição deve conter mais de 5 caracteres!', 'Alerta!');
      return;
    }
    
    if (this.selectedProductCategory === undefined){
      this.notifyService.showAlerta('Por favor selecione a categoria!', 'Alerta!');
      return;
    }else {
      this.produto.productCategories[0].prodCategoryID = this.selectedProductCategory.prodCategoryID;
    }
    
    if (this.produtoDisponivel) {
      this.produto.stockLevel = 1;
      this.produto.productStatus.prodStatusID = 1;
      }else {
        this.produto.stockLevel = 2;
      }

    if(this.name === undefined ||
      this.description === undefined || 
      this.price === undefined || 
      this.produto.productCategories[0].categoryDescription === undefined ||
      this.name === '' ||
      this.price.toString() === '' || 
      this.description === '' || 
      this.produto.productCategories[0].categoryDescription === '' ||
      this.name === null ||
      this.price === null || 
      this.description === null || 
      this.produto.productCategories[0].categoryDescription === null) {
     this.notifyService.showAlerta('Por favor preencha todos os campos!', 'Alerta!');
     return;
   } else {
     
    var restaurantID = window.sessionStorage.getItem('restaurantID');
    this.produto.restaurantID = parseInt(restaurantID);
    this.produto.name = this.name;
    this.produto.description = this.description;
    this.produto.price = this.price;

    if (this.produto.imageURL === undefined) {
      this.notifyService.showAlerta('Por favor escolha uma imagem para o cardápio!', 'Alerta!');
      return;
    }

    this.ngxLoader.start();
    console.log(this.value);
    this.produto.discount = ((this.value * this.produto.price / 100));
    console.log(this.produto)
    this.cadastroCardapioService.cadastrarProduto(this.produto).subscribe(response => {
       console.log(response);
       this.notifyService.showSuccess('Produto Cadastrado!', 'Sucesso!');
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

  removerFoto(event: Event) {
    console.log(event);
  
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
     
     this.produto.imageURL = d;
    console.log(this.produto.imageURL)
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

    handleReaderLoaded(e) {
      this.uploadedFiles.push(btoa(e.target.result));
      this.imageBase64 = btoa(e.target.result);
      console.log(btoa(e.target.result));
    }

  goBack() {
    window.history.back();
  }

}
