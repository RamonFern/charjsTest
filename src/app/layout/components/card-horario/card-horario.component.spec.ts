import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHorarioComponent } from './card-horario.component';

describe('CardHorarioComponent', () => {
  let component: CardHorarioComponent;
  let fixture: ComponentFixture<CardHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
