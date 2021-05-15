import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoEstabelecimentoComponent } from './endereco-estabelecimento.component';

describe('LoginComponent', () => {
  let component: EnderecoEstabelecimentoComponent;
  let fixture: ComponentFixture<EnderecoEstabelecimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecoEstabelecimentoComponent ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
