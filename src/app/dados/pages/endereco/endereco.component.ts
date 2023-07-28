import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EquipeService } from './../../../services/equipe.service';
import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { take } from 'rxjs';
import * as moment from 'moment';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
})
export class EnderecoComponent implements OnInit {

  agentes: AgenteUser[] = [];
  agenteEncontrado!: AgenteUser | undefined;
  agentesSelecionados: AgenteUser[] = [];
  agentesParaPermulta: AgenteUser[] = [];
  agentesDaEquipe: AgenteUser[] = [];
  agentesDaEquipeParaSalvar: AgenteUser[] = [];
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

  textRelatorioForm = new FormGroup({
    text1: new FormControl(''),
    text2: new FormControl(''),
    text3: new FormControl(''),
  })

  text1!: string;
  text2!: string;
  text3!: string;
  dataRelatorio!: string

  constructor(private agenteService: AgenteService,
              private equipeService: EquipeService,) { }

  ngOnInit() {
    this.listarAgentes();
    this.listarEquipes();
  }

  mostraRelatorio() {
    this.text1 = this.textRelatorioForm.controls['text1'].value;
    this.text2 = this.textRelatorioForm.controls['text2'].value;
    this.text3 = this.textRelatorioForm.controls['text3'].value;
  }

  teste() {
    this.text1 = this.textRelatorioForm.controls['text1'].value;
    this.textRelatorioForm.controls['text1'].value;
    // this.textRelatorioForm.controls['text2']
    // document.getElementById('text2')?.focus();
    // this.renderer.selectRootElement('message2').focus();
    console.log(this.text1);
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
      a.equipe_id === this.equipeSelecionada.id ?
        this.operacoes(a) :
        this.agentesDeFolga.push(a);
    });
  }

  operacoes(a: AgenteUser) {
    this.agentesDaEquipe.push(a);
    this.agentesDaEquipeParaSalvar.push(a);
  }

  selecionarPermulta(agenteParaPermulta: AgenteUser) {
    this.agenteParaPermulta = agenteParaPermulta;
  }

  selecionarAgenteDeFolga(agentefolga: AgenteUser) {
    this.agenteDeFolga = agentefolga;
  }

  removerObjeto(objeto: AgenteUser, objs: AgenteUser[]) {
    const index = objs.indexOf(objeto);
    if (index !== -1) {
      objs.splice(index, 1);
    }
  }

  adicionarMaisPermulta() {
    this.agentesDeFolgaEscolhidoParaPermulta = [];
    this.removerObjeto(this.agenteParaPermulta, this.agentesDaEquipe);
    this.removerObjeto(this.agenteDeFolga, this.agentesDeFolga);
  }

  criarPermulta() {
    this.agentesParaPermulta.push(this.agenteParaPermulta);
    this.agentesDeFolgaEscolhidoParaPermulta.push(this.agenteDeFolga);
    this.agentesDeFolgaEscolhidoParaPermulta2.push(this.agenteDeFolga);
  }

  removerPermulta() {
    this.agentesParaPermulta = [];
    this.agentesDeFolgaEscolhidoParaPermulta = [];
    this.agentesDeFolgaEscolhidoParaPermulta2 = [];
  }

  refazerPermultas() {
    this.agentesParaPermulta.forEach((a) => {
      this.agentesDaEquipe.push(a);
    })
    this.agentesParaPermulta = [];

    this.agentesDeFolgaEscolhidoParaPermulta.forEach((af) => {
      this.agentesDeFolga.push(af);
    })
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

  removerAgenteReforco() {
    this.agentesDeFolgaParaReforco = [];
    this.agentesDeFolgaParaReforco2 = [];
  }

  ouvePermulta(){
    console.log(this.escolha);
    this.escolha === "sim" ? null : this.removerPermulta();
  }

  voltar() {
    this.agentesParaPermulta.forEach((a) => {
      this.agentesDeFolgaEscolhidoParaPermulta.push(a);
    });
  }

  ouveReforco() {
    this.agentesDeFolga2 = this.agentesDeFolga.filter( a => !this.agentesDeFolgaEscolhidoParaPermulta2.includes( a ));
    this.escolha2 === "sim" ? null : this.removerAgenteReforco();
  }

  listarEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          this.equipes = data
        })
  }

  salvarRelatorio() {
    const agentesDaEquipe = this.agentesDaEquipeParaSalvar.map((a) => a.nome).join(", ");
    const agentesParaPermulta = this.agentesParaPermulta.map((a) => a.nome).join(", ");
    const agentesDeFolgaEscolhidoParaPermulta = this.agentesDeFolgaEscolhidoParaPermulta2.map((a) => a.nome).join(", ");
    const agentesDeFolgaParaReforco = this.agentesDeFolgaParaReforco.map((a) => a.nome).join(", ");

    const dataAtual = moment();
    const request: relatorioServicoRequest = {
      dataDoRelatorio: this.dataRelatorio,
      dataDeHoje: dataAtual.format("DD/MM/YYYY"),
      nomeEquipe: this.equipeSelecionada.nomeEquipe,
      nomeInspetor: this.agentesDaEquipeParaSalvar[0].nome, ///CORRIGIR NOME INSPETOR
      agentesDaEquipe: agentesDaEquipe,
      agentesParaPermultar: agentesParaPermulta ? agentesParaPermulta : "sem permulta",
      agenteDeFolgaParaPermultar: agentesDeFolgaEscolhidoParaPermulta ? agentesDeFolgaEscolhidoParaPermulta : "sem permulta",
      agentesParaReforco: agentesDeFolgaParaReforco ? agentesDeFolgaParaReforco : "sem reforço",
      texto1: this.text1,
      texto2: this.text2 ? this.text2 : " ",
      texto3: this.text3 ? this.text3 : " ",
    }

    console.log(request);

  }

}


export interface relatorioServicoRequest {
  dataDoRelatorio: string
  dataDeHoje: string
  nomeEquipe: string
  nomeInspetor: string
  agentesDaEquipe: string
  agentesParaPermultar: string
  agenteDeFolgaParaPermultar: string
  agentesParaReforco: string
  texto1: string
  texto2: string
  texto3: string
}
