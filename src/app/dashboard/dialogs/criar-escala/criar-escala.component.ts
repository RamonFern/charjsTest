import { EscalaServicoRequest } from 'src/app/models/escala-servico';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EquipeService } from 'src/app/services/equipe.service';
import { EscalaServicoService } from 'src/app/services/escala-servico.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogReturn } from 'src/app/layout/components/dialog-return';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { sinesp } from 'sinesp-api';

import * as moment from 'moment';


@Component({
  selector: 'app-criar-escala',
  templateUrl: './criar-escala.component.html',
  styleUrls: ['./criar-escala.component.css']
})
export class CriarEscalaComponent implements OnInit {

  escalaForm = new FormGroup({
    data: new FormControl('', Validators.required),
    equipe_id: new FormControl(0, Validators.required)
  })

  dataFim!: string;

  // equipe!: EquipeResponse;
  equipe_id!: number
  equipes: EquipeResponse[] = []

  escalaRequest!: EscalaServicoRequest

  //placa = 'PSK5H47';
  constructor(
              public dialogRef: MatDialogRef<CriarEscalaComponent>,
              private equipeService: EquipeService,
              private escalaService: EscalaServicoService,
              private notification: MatSnackBar,) { }

  ngOnInit(): void {
    this.listaEquipes();
    this.dataFim = moment().format("DD/MM/YYYY");
    console.log(this.dataFim);

  }


  criarEscala() {
    const request: EscalaServicoRequest = {
      data: this.escalaForm.controls['data'].value,
      equipe_id: this.escalaForm.controls['equipe_id'].value,
    };
    this.escalaService.criarEscalaServico(request)
        .pipe(take(1))
        .subscribe((escala) => {
          const dialogReturn: DialogReturn = { hasDataChanged: true };
          this.dialogRef.close(dialogReturn);
          this.notification.open(`Escala do dia ${ escala.data } Cadastrada`, 'Sucesso', { duration: 3000 });

          this.removerObjeto(escala);
    })
  }

  listaEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          console.log(data);
          this.equipes = data;
        })
  }
//CONTINUAR RACIOCÍNIO EM CRIAR ESCALA
  removerObjeto(objeto: any) {
    const index = this.equipes.indexOf(objeto);
    if (index !== -1) {
      this.equipes.splice(index, 1);
    }
  }

}
