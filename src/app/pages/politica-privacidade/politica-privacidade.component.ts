import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.component.html',
  styleUrls: ['./politica-privacidade.component.scss']
})
export class PoliticaPrivacidadeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
