import { Component, OnInit } from '@angular/core';
import { EscalaServicoService } from '../services/escala-servico.service';
import { take } from 'rxjs';
import { EscalaServicoResponse } from '../models/escala-servico';
import { MatDialog } from '@angular/material/dialog';
import { CriarEscalaComponent } from './dialogs/criar-escala/criar-escala.component';


import * as moment from 'moment';
import { DialogReturn } from '../models/dialog-return';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  dataHora!: string;

  // namesOfDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  escalasResponse: EscalaServicoResponse[] = [];
  escalaResponse!: EscalaServicoResponse;
  escalasFiltradas: EscalaServicoResponse[] = [];

  constructor(private escalaServicoService: EscalaServicoService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.buscarTodasEscalasServicos();
    this.dataHora = moment().format("DD/MM/YYYY");
  }

  buscarTodasEscalasServicos() {
    this.escalasFiltradas = [];
    this.escalaServicoService.listarEscala()
        .pipe(take(1))
        .subscribe((escala) => {
          this.escalasResponse = escala;
          const dataHoraInicio = moment(this.dataHora, 'DD/MM/YYYY').subtract(7,'day');
          const dataHoraFim = moment(this.dataHora, 'DD/MM/YYYY').add(7, 'day');

          this.escalasResponse.filter((es) => {
            const data = moment(es.data, 'DD/MM/YYYY');
            const dataNum = data.dayOfYear()
            if(dataNum > dataHoraInicio.dayOfYear() && dataNum < dataHoraFim.dayOfYear()) {
              this.escalasFiltradas.push(es);
            }
          })

          this.escalasResponse.filter((a) => {
            a.data === this.dataHora ? this.escalaResponse = a : null
          })
        });
  }

  criarEscalaDeServico() {
    var ultimaEscala;
    var ultimaData;
    if(this.escalasResponse.length) {
      ultimaEscala = this.escalasResponse[this.escalasResponse.length - 1];
      ultimaData = ultimaEscala.data;
    } else {
      ultimaData = this.dataHora;
    }
    const dialogRef = this.dialog.open(CriarEscalaComponent, {
      width: '550px',
      data: ultimaData,
    });

    dialogRef.afterClosed().subscribe((result: DialogReturn) => {
      if (result?.hasDataChanged) {
        this.buscarTodasEscalasServicos();
      }
  });
  }

}
