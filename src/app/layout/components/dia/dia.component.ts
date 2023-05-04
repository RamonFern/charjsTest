import { EquipeService } from './../../../services/equipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EscalaServicoResponse } from 'src/app/models/escala-servico';
import * as moment from 'moment';

@Component({
  selector: 'app-dia',
  templateUrl: './dia.component.html',
  styleUrls: ['./dia.component.css']
})
export class DiaComponent implements OnInit {

  @Input() dia!: EscalaServicoResponse;
  equipe!: EquipeResponse;
  id!: number;
  dataAtual!: string;

  constructor(private equipeService: EquipeService) { }

  ngOnInit(): void {
    this.dataAtual = moment().format("DD/MM/YYYY");
    this.dia.equipe_id ? this.id = this.dia.equipe_id : null;
    this.buscarEquipe();
  }

  buscarEquipe() {
    this.equipeService.buscarPorId(this.id)
        .pipe(take(1))
        .subscribe((equipe) => {
          this.equipe = equipe;
        })
  }

}
