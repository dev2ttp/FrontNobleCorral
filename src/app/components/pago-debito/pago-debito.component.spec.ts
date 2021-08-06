import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDebitoComponent } from './pago-debito.component';

describe('PagoDebitoComponent', () => {
  let component: PagoDebitoComponent;
  let fixture: ComponentFixture<PagoDebitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoDebitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDebitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
