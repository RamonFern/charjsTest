import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EquipeService } from './../../../services/equipe.service';
import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { take } from 'rxjs';
import * as moment from 'moment';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RelatorioRequest } from 'src/app/models/relatorio-request';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { jsPDF } from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { DialogReturn } from 'src/app/layout/components/dialog-return';
import { NovoRelatorioComponent } from './dialogs/NovoRelatorio/NovoRelatorio.component';


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: [ './endereco.component.css' ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
})
export class EnderecoComponent implements OnInit {


  relatorios: RelatorioRequest[] = [];
  addRelatorio = false;

  constructor(
              private relatorioService: RelatorioService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.buscarRelatorios();
  }

  novoRelatorio() {
    const dialogRef = this.dialog.open(NovoRelatorioComponent, {
            width: '950px',
            // data: { equipe: this.equipe, agentes: this.agentesDaEquipe }
          });

          dialogRef.afterClosed().subscribe((result: DialogReturn) => {
            if (result?.hasDataChanged) {
              // this.buscarTodasEscalasServicos();
            }
        });
  }



  voltarListagemRelatorio() {
    this.addRelatorio = false;
  }



  buscarRelatorios() {
    this.relatorioService.buscarTodos()
        .pipe((take(1)))
        .subscribe((rel) => {
          this.relatorios = rel;
          // console.log(this.relatorios);
        })
  }



}



