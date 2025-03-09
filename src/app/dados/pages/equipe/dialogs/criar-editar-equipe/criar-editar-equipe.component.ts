import { AgenteService } from './../../../../../services/agente.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
import { DialogReturn } from 'src/app/models/dialog-return';
import { EscalaServicoResponse } from 'src/app/models/escala-servico';
import { EquipeService } from 'src/app/services/equipe.service';
import { EscalaServicoService } from 'src/app/services/escala-servico.service';

@Component({
  selector: 'app-criar-editar-equipe',
  templateUrl: './criar-editar-equipe.component.html',
  styleUrls: ['./criar-editar-equipe.component.css']
})
export class CriarEditarEquipeComponent implements OnInit {
  equipeForm = new FormGroup({
    nome: new FormControl('', Validators.required),
  })
  loadEquipe = false;
  equipeCarregada!: EquipeResponse;
  escalasServico: EscalaServicoResponse[] = [];
  agentes: AgenteUser[] = [];
  agente!: AgenteUser;
  agentesDaEquipe: AgenteUser[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { equipe: EquipeResponse, agentes: AgenteUser[] },
              public dialogRef: MatDialogRef<CriarEditarEquipeComponent>,
              private notification: MatSnackBar,
              private equipeService: EquipeService,
              private agenteService: AgenteService,
              private escalaService: EscalaServicoService) { }

  ngOnInit() {
    this.buscarAgentesSemEquipe();
    this.equipeCarregada = this.data.equipe;
    this.agentesDaEquipe = this.data.equipe.membros;
    this.buscarEscalasDaEquipe();
  }

  buscarEscalasDaEquipe() {
    this.escalaService
        .buscarEscalaServicoDaEquipe(this.data.equipe.id)
        .pipe(take(1))
        .subscribe((escalas) => {
          this.escalasServico = escalas;
        })
  }

  escolherAgente(agente: AgenteUser) {
    this.agente = agente;
    this.adicionarAEquipe();
  }

  adicionarAEquipe() {
    this.agente.equipe_id = this.equipeCarregada.id;
    this.agentesDaEquipe.push(this.agente);
    this.agentes.splice(this.agentes.indexOf(this.agente), 1);
  }

  buscarAgentes() {
    this.agenteService.listar()
        .pipe(take(1))
        .subscribe((agentes) => {
          this.agentes = agentes;
        })
  }

  editarEquipe() {
    this.buscarAgentes();
    this.equipeForm.controls['nome'].setValue(this.data.equipe.nome);
    this.loadEquipe = !this.loadEquipe;
  }

  removerDaEquipe(agente: AgenteUser) {
    this.agenteService.removerAgenteDaEquipe(agente.id)
        .pipe(take(1))
        .subscribe((response) => {
          this.notification.open(response, 'Sucesso', { duration: 3000 });
        })
    this.equipeCarregada.membros.splice(this.agentesDaEquipe.indexOf(agente), 1);
    this.agentes.push(agente);
  }

  salvarEquipe() {
    const request: EquipeRequest = {
      nome: this.equipeForm.controls['nome'].value,
    }
    this.loadEquipe = !this.loadEquipe;
    this.equipeService
        .editarNomeEquipe(request, this.data.equipe.id)
        .pipe(take(1))
        .subscribe((equipe) => {
          this.equipeCarregada = equipe;
          this.alterarEquipeNoAgente();
          const dialogReturn: DialogReturn = { hasDataChanged: true };
          this.dialogRef.close(dialogReturn);
          this.notification.open('Equipe atualizada', 'Sucesso', { duration: 3000 });
        })
  }

  alterarEquipeNoAgente() {
    this.agentesDaEquipe.forEach((a) => {
      this.atualizaAgenteNaEquipe(a, this.data.equipe.id);
    })
  }

  atualizaAgenteNaEquipe(agente: AgenteUser, id: number) {
    this.agenteService
        .adicinarAgenteEmEquipe(agente.id, id)
        .pipe(take(1))
        .subscribe(() => { })
  }

  removerAgenteDeEquipe(agenteId: number) {
    this.agenteService
        .removerAgenteDaEquipe(agenteId)
        .pipe(take(1))
        .subscribe((a) => {})
  }

  buscarAgentesSemEquipe() {
    this.agenteService
        .getAgentesSemEquipe()
        .pipe(take(1))
        .subscribe((a) => {
          this.agentes = a;
        })
  }


}

