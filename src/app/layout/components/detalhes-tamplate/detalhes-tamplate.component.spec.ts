import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesTamplateComponent } from './detalhes-tamplate.component';

describe('DetalhesTamplateComponent', () => {
  let component: DetalhesTamplateComponent;
  let fixture: ComponentFixture<DetalhesTamplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesTamplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesTamplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
