import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Base64 } from 'js-base64';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxUiLoaderService } from 'ngx-ui-loader';import { observable, Observable, Subscriber } from 'rxjs';
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

  file: any;
localUrl: any;
localCompressedURl:any;
sizeOfOriginalImage:number;
sizeOFCompressedImage:number;

  myimage: Observable<any>;

  constructor(private router: Router,
    private detalheCardapioService: DetalheCardapioService,
    private notifyService : NotificationService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute, private imageCompress: NgxImageCompressService){

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

   // this.imageBase64 = this.myimage;
    
    this.produto.imageURL = this.imageBase64; //=== undefined ? this.produto.imageURL : this.imageBase64;

    console.log(this.produto.imageURL);
  
    this.ngxLoader.start();
    console.log(this.value);

    if (this.value === undefined){
      this.produto.discount = 0;
    } else {
      this.produto.discount = ((this.value * this.produto.price / 100));
    }
   console.log(this.produto.imageURL);
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

  // ReadAsBase64(file): Promise<any> {
  //   const reader = new FileReader();
  //   const fileValue = new Promise((resolve, reject) => {
  //     reader.addEventListener('load', () => {
  //       const result = reader.result as DOMString;
  //       if (!result) reject('Cannot read variable');
  //       if (result.length * 2  > 2**21) reject('File exceeds the maximum size'); // Note: 2*2**20 = 2**21 
  //       resolve(reader.result);
  //     });

  //     reader.addEventListener('error', event => {
  //       reject(event);
  //     });

  //     reader.readAsDataURL(file);
  //   });

  //   return fileValue;
  // }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
     
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
     this.imageBase64 = d;
    console.log(this.imageBase64)
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
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = this.handleReaderLoaded.bind(this);
    //   reader.readAsArrayBuffer(file);
    // }
    this.convertToBase64(file);
  }
    handleReaderLoaded(e) {
      this.uploadedFiles.push(btoa(e.target.result));
      this.imageBase64 = btoa(encodeURIComponent((e.target.result))); //btoa(e.target.result);
      console.log(btoa(e.target.result));
    }
    
  goBack() {
    window.history.back();
  }
}
