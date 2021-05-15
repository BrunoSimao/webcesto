import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalhePedidoComponent } from './modal-detalhe-pedido.component';

describe('ModalDetalhePedidoComponent', () => {
  let component: ModalDetalhePedidoComponent;
  let fixture: ComponentFixture<ModalDetalhePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalhePedidoComponent ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalhePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
