import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioGeralHorasComponent } from './relatorio-geral-horas.component';

describe('RelatorioGeralHorasComponent', () => {
  let component: RelatorioGeralHorasComponent;
  let fixture: ComponentFixture<RelatorioGeralHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioGeralHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioGeralHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
