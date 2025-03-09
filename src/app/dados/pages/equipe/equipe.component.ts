import { AgenteService } from './../../../services/agente.service';
import { EquipeService } from './../../../services/equipe.service';
import { Component, OnInit } from '@angular/core';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  add = false;
  equipes: EquipeResponse[] = [];
  equipeCriada!: EquipeResponse;
  agentes: AgenteUser[] = [];
  agentesQueNaoTemEquipe: AgenteUser[] = [];
  agentesDaEquipe: AgenteUser[] = [];
  agentesDaEquipeRetornado: AgenteUser[] = [];

  equipeForm = new FormGroup({
    nomeequipe: new FormControl('', Validators.required),
    id_agentes: new FormControl('', Validators.required)
  })

  equipe01!: string[];
  equipe02!: string[];
  equipe03!: string[];
  equipe04!: string[];

  constructor(private equipeService: EquipeService,
              private agenteService: AgenteService,
              private notification: MatSnackBar) { }

  ngOnInit() {
    this.buscarEquipes();
    this.buscarAgentesSemEquipes();

    this.listarAgentes();
    this.equipe01 = this.separarAgentesPorEquipe(this.equipes[0]);
    this.equipe02 = this.separarAgentesPorEquipe(this.equipes[1]);
    this.equipe03 = this.separarAgentesPorEquipe(this.equipes[2]);
    this.equipe04 = this.separarAgentesPorEquipe(this.equipes[3]);
  }

  salvarEquipe() {
  const request: EquipeRequest = {
    nome: this.equipeForm.controls['nomeequipe'].value,
  };

  this.equipeService.criarEquipe(request)
    .pipe(take(1))
    .subscribe((equipe) => {
      this.equipeCriada = equipe;
      this.adicionarAgenteEmEquipe(this.equipeCriada);
    })
  }

  adicionarAgenteEmEquipe(equipe: EquipeResponse) {
    this.agentesDaEquipe.forEach((ag) => {
      if(ag.equipe_id === null) {
        ag.equipe_id = equipe.id;
        this.atualizarAgente(ag, ag.id);
      } else {
        this.notification.open(`Agente já possui uma equipe!`, 'Erro', { duration: 3000 });
      }
    })
    this.limparCampos();
    this.add = false;
    this.agentesDaEquipe = [];
    this.buscarEquipes();
  }


  atualizarAgente(agente: AgenteUser, id: number) {
    this.agenteService.atualizarAgente(agente, id)
      .pipe(take(1))
      .subscribe((ag) => {
        ag = agente;
      })
  }

  listarAgentes() {
    this.agenteService.listar()
    .pipe(take(1))
    .subscribe((ag) => {
      this.agentes = ag;
      this.buscarAgentesSemEquipes();

    })
  }

  buscarAgentesSemEquipes() {
    this.agenteService.getAgentesSemEquipe()
        .pipe(take(1))
        .subscribe((agentes) => {
          this.agentesQueNaoTemEquipe = agentes;
        })
  }

  separarAgentesPorEquipe(equipe: EquipeResponse) {
    const ag = this.agentes.filter((a) => a.equipe_id === equipe.id);
    const nomesDosAgentes: string[] = ag.map(agente => agente.nome);
    return nomesDosAgentes;
  }

  enviarAgentesSemEquipe() {
    const agentesSemEquipe: string[] = this.agentesQueNaoTemEquipe.map(ag => ag.nome);
    return agentesSemEquipe;
  }

  selecionarAgenteParaEquipe(agente: AgenteUser) {
    this.agentesDaEquipe.push(agente);
  }

  buscarEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          this.equipes = data
        })
  }

  addAgente() {
    this.add = true;
    this.buscarAgentesSemEquipes();
  }

  limparCampos() {
    this.equipeForm.reset();
    this.add = false;
  }

}
