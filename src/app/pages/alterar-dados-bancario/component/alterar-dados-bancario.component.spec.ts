import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDadosBancarioComponent } from './alterar-dados-bancario.component';

describe('AlterarDadosBancario', () => {
  let component: AlterarDadosBancarioComponent;
  let fixture: ComponentFixture<AlterarDadosBancarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarDadosBancarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarDadosBancarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
