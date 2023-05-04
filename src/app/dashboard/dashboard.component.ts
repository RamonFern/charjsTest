import { Component, OnInit } from '@angular/core';
import { EscalaServicoService } from '../services/escala-servico.service';
import { take } from 'rxjs';
import { EscalaServicoResponse } from '../models/escala-servico';
import { MatDialog } from '@angular/material/dialog';
import { CriarEscalaComponent } from './dialogs/criar-escala/criar-escala.component';
import { DialogReturn } from '../layout/components/dialog-return';
import { SinespService } from '../services/sinesp.service';

import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // placa!: string;
  // dadosVeiculo: any;
  // mensagemErro!: string;

  dataHora!: string;

  namesOfDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  escalasResponse: EscalaServicoResponse[] = [];
  escalaResponse!: EscalaServicoResponse;

  constructor(private escalaServicoService: EscalaServicoService,
              // private sinespService: SinespService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.buscarTodasEscalasServicos();
    this.dataHora = moment().format("DD/MM/YYYY");
  }

  buscarTodasEscalasServicos() {
    this.escalaServicoService.listarEscala()
        .pipe(take(1))
        .subscribe((escala) => {
          this.escalasResponse = escala;
          this.escalasResponse.filter((a) => {
            a.data === this.dataHora ? this.escalaResponse = a : null
          })
        });
  }


  criarEscalaDeServico() {
    const dialogRef = this.dialog.open(CriarEscalaComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result: DialogReturn) => {
      if (result?.hasDataChanged) {
        this.buscarTodasEscalasServicos();
      }
  });
  }
 // consultarPlaca() {
  //   this.sinespService.consultarPlaca(this.placa)
  //     .then(response => {
  //       console.log(response)
  //       if (response.data.situacao === 'ERRO') {
  //         this.mensagemErro = response.data.mensagem;
  //       } else {
  //         this.dadosVeiculo = response.data;
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.mensagemErro = `Ocorreu um erro ao consultar a placa. ERRO -> ${error}`;
  //     });
  // }


  /**novoAtendimento(): void {
        const dialogRef = this.dialog.open(AtendimentoPacienteComponent, {
            width: '550px',
            data: this.idPaciente,
        });

        dialogRef.afterClosed().subscribe((result: DialogReturn) => {
            if (result?.hasDataChanged) {
                this.listarAtendimentos();
            }
        });
    } */

}
