import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EquipeService } from './../../../services/equipe.service';
import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { pipe, take } from 'rxjs';
import * as moment from 'moment';


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
  agenteEncontrado!: AgenteUser | undefined;
  agentesSelecionados: AgenteUser[] = [];
  agentesParaPermulta: AgenteUser[] = [];
  agentesDaEquipe: AgenteUser[] = [];
  agentesDeFolga: AgenteUser[] = [];
  agentesDeFolga2: AgenteUser[] = [];
  agentesDeFolgaEscolhidoParaPermulta: AgenteUser[] = [];
  agentesDeFolgaEscolhidoParaPermulta2: AgenteUser[] = [];
  agentesDeFolgaParaReforco: AgenteUser[] = [];
  agentesDeFolgaParaReforco2: AgenteUser[] = [];
  agenteDeFolga!: AgenteUser;
  agenteParaPermulta!: AgenteUser;
  agenteEscolhidoParaReforco!: AgenteUser;
  escolha!: string;
  escolha2!: string;
  equipes: EquipeResponse[] = [];
  equipeSelecionada!: EquipeResponse;
  equipe!: EquipeResponse;


  permulta: string[] = ['sim', 'nao'];
  dataForm = new FormGroup({
    dataRelatorio: new FormControl('', Validators.required)
  })

  dataRelatorio!: string




  constructor(private agenteService: AgenteService, private equipeService: EquipeService) { }

  ngOnInit() {

    this.listarAgentes();
    this.listarEquipes();
  }

  atualizaControlDeDatas() {
    const data = moment(this.dataForm.controls['dataRelatorio'].value);
    this.dataRelatorio = data.format("DD/MM/YYYY");
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

  refazerPermultas() {
    this.agentesParaPermulta = [];
    this.agentesDeFolgaEscolhidoParaPermulta = [];
    this.agentesDeFolgaEscolhidoParaPermulta2 = [];
  }

  selecionarAgenteDeFolgaParaReforco(agente: AgenteUser) {
    this.agenteEscolhidoParaReforco = agente;
  }

  addAgenteReforco() {
    this.agentesDeFolgaParaReforco.push(this.agenteEscolhidoParaReforco);
    this.agentesDeFolgaParaReforco2.push(this.agenteEscolhidoParaReforco);
  }

  ouvePermulta(){
    console.log(this.escolha);
  }

  ouveReforco() {
    this.agentesDeFolga2 = this.agentesDeFolga.filter( a => !this.agentesDeFolgaEscolhidoParaPermulta2.includes( a ));
  }

  listarEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          this.equipes = data
        })
  }

}
