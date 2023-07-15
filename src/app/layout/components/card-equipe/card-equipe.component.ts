import { take } from 'rxjs';
import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { EquipeResponse } from './../../../models/EquipeRequest';
import { EquipeComponent } from './../../../dados/pages/equipe/equipe.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-equipe',
  templateUrl: './card-equipe.component.html',
  styleUrls: ['./card-equipe.component.css']
})
export class CardEquipeComponent implements OnInit {

  @Input() equipe!: EquipeResponse;

  agentesDaEquipe: AgenteUser[] = [];

  constructor(private agenteservice: AgenteService) { }

  ngOnInit() {
    this.buscarAgentesDaEquipe(this.equipe);
  }

  buscarAgentesDaEquipe(equipe: EquipeResponse) {
    this.agenteservice.listar()
        .pipe(take(1))
        .subscribe((a) => {
          a.forEach((a) => {
            a.equipe_id === equipe.id ? this.agentesDaEquipe.push(a) : null
          })
        })
  }

}
