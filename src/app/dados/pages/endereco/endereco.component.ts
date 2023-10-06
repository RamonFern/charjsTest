import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { take } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RelatorioRequest } from 'src/app/models/relatorio-request';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { MatDialog } from '@angular/material/dialog';
import { NovoRelatorioComponent } from './dialogs/NovoRelatorio/NovoRelatorio.component';
import { DialogReturn } from 'src/app/models/dialog-return';


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
            width: '1250px',
            // data: { equipe: this.equipe, agentes: this.agentesDaEquipe }
          });

          dialogRef.afterClosed().subscribe((result: DialogReturn) => {
            if (result?.hasDataChanged) {
              this.buscarRelatorios();
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



