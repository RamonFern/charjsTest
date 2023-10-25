import { EscalaServicoRequest } from 'src/app/models/escala-servico';
import { Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EquipeService } from 'src/app/services/equipe.service';
import { EscalaServicoService } from 'src/app/services/escala-servico.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';
import { DialogReturn } from 'src/app/models/dialog-return';


@Component({
  selector: 'app-criar-escala',
  templateUrl: './criar-escala.component.html',
  styleUrls: ['./criar-escala.component.css']
})
export class CriarEscalaComponent implements OnInit {

  escalaForm = new FormGroup({
    data: new FormControl('', Validators.required),
    equipe_id: new FormControl(null, Validators.required)
  })

  equipe_id!: number
  equipes: EquipeResponse[] = []

  escalaRequest!: EscalaServicoRequest

  currentDate!: moment.Moment;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: string,
              public dialogRef: MatDialogRef<CriarEscalaComponent>,
              private equipeService: EquipeService,
              private escalaService: EscalaServicoService,
              private notification: MatSnackBar,) { }

  ngOnInit(): void {
    this.currentDate = moment(this.data, "DD/MM/YYYY" , 'br');
    this.currentDate.add(1, 'd');

    this.escalaForm.controls['data'].setValue(this.currentDate.format("DD/MM/YYYY"));

    this.listaEquipes();
  }


  criarEscala() {
    if(!this.escalaForm.valid) {
      this.notification.open(`Preencha todos os campos obrigatórios`, 'Erro', { duration: 3000 });
    } else {
      const request: EscalaServicoRequest = {
        data: this.escalaForm.controls['data'].value,
        equipeid: this.escalaForm.controls['equipe_id'].value,
      };
      this.escalaService.criarEscalaServico(request)
          .pipe(take(1))
          .subscribe((escala) => {
            const dialogReturn: DialogReturn = { hasDataChanged: true };
            this.dialogRef.close(dialogReturn);
            this.notification.open(`Escala do dia ${ escala.data } Cadastrada`, 'Sucesso', { duration: 3000 });
      })
    }

  }

  listaEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          // console.log(data);
          this.equipes = data;
        })
  }



}
