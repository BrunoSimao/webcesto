import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCadastroEstComponent } from './alterar-cadastro-estabelecimento.component';

describe('AlterarCadastroEstComponent', () => {
  let component: AlterarCadastroEstComponent;
  let fixture: ComponentFixture<AlterarCadastroEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarCadastroEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarCadastroEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
