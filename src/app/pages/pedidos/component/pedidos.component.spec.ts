import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedicosComponent } from './pedidos.component';

describe('TablesComponent', () => {
  let component: PedicosComponent;
  let fixture: ComponentFixture<PedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
