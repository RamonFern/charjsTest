import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDiarioVtrComponent } from './relatorio-diario-vtr.component';

describe('RelatorioDiarioVtrComponent', () => {
  let component: RelatorioDiarioVtrComponent;
  let fixture: ComponentFixture<RelatorioDiarioVtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioDiarioVtrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDiarioVtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
