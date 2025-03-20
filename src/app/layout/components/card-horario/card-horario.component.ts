import { Component, Input, OnInit } from '@angular/core';
import { HorarioAgenteResponse } from 'src/app/models/horarioAgenteResponse';

@Component({
  selector: 'app-card-horario',
  templateUrl: './card-horario.component.html',
  styleUrls: ['./card-horario.component.css']
})
export class CardHorarioComponent implements OnInit {
  @Input() horariosResponse!: HorarioAgenteResponse;
  constructor() { }

  ngOnInit(): void {
    console.log(this.horariosResponse);
  }

}
