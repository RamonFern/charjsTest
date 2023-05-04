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
    //this.escalaServicoService.pesquisaVeiculo(this.placa).pipe(take(1)).subscribe((data) => console.log(data));
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
          console.log(escala);
        // }, (erro: HttpErrorResponse) => {
        //   // this.loadRequisicao = false
       //   this.notification.open(erro.error.details ? erro.error.details : 'Consulte o time de suporte para maiores informações.', 'Erro')
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

}
