import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipePlantaoComponent } from './equipe-plantao.component';

describe('EquipePlantaoComponent', () => {
  let component: EquipePlantaoComponent;
  let fixture: ComponentFixture<EquipePlantaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipePlantaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipePlantaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
