import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoVeiculoComponent } from './grafico-veiculo.component';

describe('GraficoVeiculoComponent', () => {
  let component: GraficoVeiculoComponent;
  let fixture: ComponentFixture<GraficoVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoVeiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
