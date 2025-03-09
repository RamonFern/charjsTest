import { EquipeService } from './../../../services/equipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EscalaServicoResponse } from 'src/app/models/escala-servico';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

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
  diaSemana!: string;

  constructor(private equipeService: EquipeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    const dateDia = moment(this.dia.data, "DD/MM/YYYY").locale('pt-br');
    this.diaSemana = dateDia.format('dddd');
    // console.log(dateDia.format('dd'))
    this.dataAtual = moment().format("DD/MM/YYYY");
    this.dia.equipeid ? this.id = this.dia.equipeid : null;
    this.buscarEquipe();
  }

  buscarEquipe() {
    this.equipeService.buscarPorId(this.id)
        .pipe(take(1))
        .subscribe((equipe) => {
          this.equipe = equipe;
        })
  }

   // Abre o card de detalhes
  // abrirCardDetalhes() {
  //   this.dialog.open(this.DetalhesTamplateComponent, {
  //     width: '400px',
  //     data: this.equipe
  //   });
  // }

}
