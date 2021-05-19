import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-DetalheCardapio',
  templateUrl: './detalhe-cardapio.component.html',
  styleUrls: ['./detalhe-cardapio.component.scss']
})
export class DetalheCardapioComponent implements OnInit, OnDestroy {
  constructor(private router: Router){
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  
  onFileChanged(event) {
    const file = event.target.files[0]
    
  }

  mudaBotao(){
    window.document.getElementById("botao").style.color = "#0000FF";
  }
  
  // goBack() {
  //   window.history.back();
  // }

}
