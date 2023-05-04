import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEscalaComponent } from './criar-escala.component';

describe('CriarEscalaComponent', () => {
  let component: CriarEscalaComponent;
  let fixture: ComponentFixture<CriarEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarEscalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
