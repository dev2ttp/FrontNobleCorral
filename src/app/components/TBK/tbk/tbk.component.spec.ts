import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TBKComponent } from './tbk.component';

describe('TBKComponent', () => {
  let component: TBKComponent;
  let fixture: ComponentFixture<TBKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TBKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TBKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
