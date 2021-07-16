import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlterarEnderecoEstComponent } from './alterar-endereco-estabelecimento.component';

describe('AlterarEnderecoEstComponent', () => {
  let component: AlterarEnderecoEstComponent;
  let fixture: ComponentFixture<AlterarEnderecoEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarEnderecoEstComponent ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarEnderecoEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
