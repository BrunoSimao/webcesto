import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheCardapioComponent } from './detalhe-cardapio.component';


describe('DetalheCardapioComponent', () => {
  let component: DetalheCardapioComponent;
  let fixture: ComponentFixture<DetalheCardapioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheCardapioComponent ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
