import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaResetSenhaComponent } from './valida-reset-senha.component';

describe('ResetSenhaComponent', () => {
  let component: ValidaResetSenhaComponent;
  let fixture: ComponentFixture<ValidaResetSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaResetSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidaResetSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
