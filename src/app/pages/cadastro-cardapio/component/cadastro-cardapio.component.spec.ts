import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroCardapioComponent } from './cadastro-cardapio.component';


describe('DetalheCardapioComponent', () => {
  let component: CadastroCardapioComponent;
  let fixture: ComponentFixture<CadastroCardapioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCardapioComponent ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
