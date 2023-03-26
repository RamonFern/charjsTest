import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EquipeService } from './../../../services/equipe.service';
import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { pipe, take } from 'rxjs';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class EnderecoComponent implements OnInit {

  agentes: AgenteUser[] = [];
  agentesSelecionados: AgenteUser[] = [];
  agentesParaPermulta: AgenteUser[] = [];
  agentesDaEquipe: AgenteUser[] = [];
  agentesDeFolga: AgenteUser[] = [];
  agentesDeFolgaEscolhidoParaPermulta: AgenteUser[] = [];
  agentesDeFolgaEscolhidoParaPermulta2: AgenteUser[] = [];
  agentesDeFolgaParaReforco: AgenteUser[] = [];
  agenteDeFolga!: AgenteUser;
  agenteParaPermulta!: AgenteUser;
  escolha!: string;
  escolha2!: string;
  equipes: EquipeResponse[] = [];
  equipeSelecionada!: EquipeResponse;
  equipe!: EquipeResponse;


  permulta: string[] = ['sim', 'nao'];

  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });

  constructor(private agenteService: AgenteService, private equipeService: EquipeService) { }

  ngOnInit() {

    this.listarAgentes();
    this.listarEquipes();
  }

  listarAgentes() {
    this.agenteService.listar()
    .pipe(take(1))
    .subscribe((ag) => {
      this.agentes = ag;
    })
  }

  selecionar(agente: AgenteUser) {
    this.agentesSelecionados.push(agente);
  }

  selecionarEquipe(equipe: EquipeResponse) {
    console.log(equipe);
    this.equipeSelecionada = equipe;
  }

  escolherOutraEquipe() {
    this.agentesDaEquipe = [];
  }

  adicionarEquipeAoRelatorio() {
    this.agentes.filter((a) => {
      a.equipe_id === this.equipeSelecionada.id ? this.agentesDaEquipe.push(a) : this.agentesDeFolga.push(a);
    })
  }

  selecionarPermulta(agenteParaPermulta: AgenteUser) {
    this.agenteParaPermulta = agenteParaPermulta;

  }

  selecionarAgenteDeFolga(agentefolga: AgenteUser) {
    this.agenteDeFolga = agentefolga;
  }

  adicionarMaisPermulta() {
    this.agentesDeFolgaEscolhidoParaPermulta = [];
  }

  criarPermulta() {
    this.agentesParaPermulta.push(this.agenteParaPermulta);
    this.agentesDeFolgaEscolhidoParaPermulta.push(this.agenteDeFolga);
    this.agentesDeFolgaEscolhidoParaPermulta2.push(this.agenteDeFolga);
  }

  selecionarAgenteDeFolgaParaReforco(agente: AgenteUser) {
    this.agentesDeFolgaParaReforco.push(agente);
  }

  ouvePermulta(){
    console.log(this.escolha);
  }

  ouveReforco() {

  }

  listarEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          this.equipes = data
        })
  }
}
