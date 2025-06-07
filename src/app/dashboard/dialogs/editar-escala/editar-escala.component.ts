import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EscalaServicoRequest } from 'src/app/models/escala-servico';
import { EquipeService } from 'src/app/services/equipe.service';
import { EscalaServicoService } from 'src/app/services/escala-servico.service';

@Component({
  selector: 'app-editar-escala',
  templateUrl: './editar-escala.component.html',
  styleUrls: ['./editar-escala.component.css']
})
export class EditarEscalaComponent implements OnInit {

  escalaForm = new FormGroup({
    data: new FormControl('', Validators.required),
    equipe_id: new FormControl(null, Validators.required)
  })

  equipes: EquipeResponse[] = [];

  escalaRequest!: EscalaServicoRequest;

  displayedColumns: string[] = ['codigo', 'nome', 'funcao'];
  dados: any;
  editar = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private equipeService: EquipeService,
              private escalaService: EscalaServicoService,
              private notification: MatSnackBar) { }

  ngOnInit(): void {
    this.dados = this.data;
    // console.log(this.dados);
    this.listaEquipes();

  }

  listaEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          // console.log(data);
          this.equipes = data;
        })
  }

  ///COMPLETAR AÇÃO DE EDITAR ESCALA
  // atualizarEscala() {
  //   this.escalaService.editarEscalaServico(this.dados.dia.id, this.dados.dia)
  //       .pipe(take(1))
  //       .subscribe((e) => {
  //         console.log(e);
  //       })
  // }

  editarEscala() {
    this.editar = !this.editar;
    this.escalaForm.controls['data'].setValue(this.dados.dia.data);
  }

}
