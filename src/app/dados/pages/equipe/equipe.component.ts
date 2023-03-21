import { AgenteService } from './../../../services/agente.service';
import { EquipeService } from './../../../services/equipe.service';
import { Component, OnInit } from '@angular/core';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
import { take } from 'rxjs';

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
  agentesSemEquipe: AgenteUser[] = [];
  agentesDaEquipe: AgenteUser[] = [];
  agentesDaEquipeRetornado: AgenteUser[] = [];

  equipeForm = new FormGroup({
    nomeEquipe: new FormControl('', Validators.required),
    id_agentes: new FormControl('', Validators.required)
  })
  constructor(private equipeService: EquipeService, private agenteService: AgenteService) { }

  ngOnInit() {
    this.buscarEquipes();
    this.listarAgentes();
  }

  salvarEquipe() {

    const request: EquipeRequest = {
      nomeEquipe: this.equipeForm.controls['nomeEquipe'].value,
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
      if(ag.equipe_id === 0) {
        ag.equipe_id = equipe.id;
        this.atualizarAgente(ag, ag.id);
      } else {
        console.log("Agente já possui uma equipe!");
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
      this.agentesSemEquipe = ag.filter((a) => a.equipe_id === 0);
    })
  }

  listarAgentesDaEquipe(equipe: EquipeResponse) {
    this.agentes.filter((a) => {
      a.equipe_id === equipe.id ? this.agentesDaEquipeRetornado.push(a) : null
    })
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
    this.agentesSemEquipe = this.agentes.filter((a) => a.equipe_id === 0);
  }

  limparCampos() {
    this.equipeForm.reset();
    this.add = false;
  }

}
