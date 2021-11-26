import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Base64 } from 'js-base64';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxUiLoaderService } from 'ngx-ui-loader';import { FileUpload } from 'primeng/fileupload';
import { observable, Observable, Subscriber } from 'rxjs';
;
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
  productsCategories: ProductCategory[] = []
  selectedProductCategory: ProductCategory;
  customSwitches: string;
  produtoDisponivel: boolean = false;
  checked1: boolean = false;
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  decodeUrl: string;
  isExcluirImagem: boolean = false;
  yourCondition: boolean = false;
  isExcluirButton: boolean = false;
  myimage: Observable<any>;

  constructor(private router: Router,
    private detalheCardapioService: DetalheCardapioService,
    private notifyService : NotificationService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute, private sanitizer:DomSanitizer,){

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
   this.isExcluirImagem = true;
   this.yourCondition = true;
   this.isExcluirButton = true;
    this.getProductCategory();
    
    this.route.params.subscribe( parametros => {
      if (parametros['id']) {
        console.log(parametros.id);
        this.getProductByID(parametros.id);
      }

      if (this.produto.stockLevel === 1) {
        this.produtoDisponivel = true;
        }else {
          this.produtoDisponivel = false;
        }
    });
  
  }


  getProductByID(prodID: string) {
    this.detalheCardapioService.getProdutoByID(parseInt(prodID)).subscribe((product) => {
     
     this.produto = product;
     this.produto.productCategory = this.produto.productCategories[0].categoryDescription;

     this.decodeUrl = decodeURIComponent(atob(this.produto.imageURL));
     this.decodeUrl = 'data:image/jpeg;base64,' +  this.decodeUrl;
     console.log(this.decodeUrl);
     this.produto.imageURL = this.decodeUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

      console.log(product);
    });
  }

  salvarCardapio() {
    
    if (this.selectedProductCategory === undefined && this.produto.productCategory === null){
      this.notifyService.showAlerta('Por favor selecione a categoria!', 'Alerta!');
      return;
    }else if (this.selectedProductCategory === undefined) {
      this.produto.productCategories[0] = this.selectedProductCategory === undefined ? this.produto.productCategories[0] : this.produto.productCategories[0];
    
    }else {
      this.produto.productCategories[0] = this.selectedProductCategory;
      this.produto.productCategory = this.selectedProductCategory.categoryDescription;
    }

    if(this.produto.name === undefined ||
      this.produto.price === undefined || 
      this.produto.description === undefined || 
      this.produto.productCategories[0].categoryDescription === undefined ||
      this.produto.name === '' ||
      this.produto.price.toString() === '' || 
      this.produto.description === '' || 
      this.produto.productCategories[0].categoryDescription === '' ||
      this.produto.name === null ||
      this.produto.price === null || 
      this.produto.description === null || 
      this.produto.productCategories[0].categoryDescription === null) {
     this.notifyService.showAlerta('Por favor preencha todos os campos!', 'Alerta!');
     return;
   } else {
     
    if (this.produtoDisponivel) {
      this.produto.stockLevel = 1;
    } else {
      this.produto.stockLevel = 2;
    }

    console.log(this.produto.imageURL);
    
    this.ngxLoader.start();
    console.log(this.value);

    if (this.value === undefined){
      this.produto.discount = 0;
    } else {
      this.produto.discount = ((this.value * this.produto.price / 100));
    }
   console.log(this.produto.imageURL);

   if (this.produto.imageURL === undefined || this.produto.imageURL === '') {
    this.notifyService.showAlerta('Por favor escolha uma imagem para o cardápio!', 'Alerta!');
    return;
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

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
}

ExcluirImagem() {
  this.decodeUrl = '';
  this.produto.imageURL = '';
  this.isExcluirImagem = false;
  this.yourCondition = false;
  this.isExcluirButton = false;
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
    this.convertToBase64(file);

  }
    
  goBack() {
    window.history.back();
  }
}
