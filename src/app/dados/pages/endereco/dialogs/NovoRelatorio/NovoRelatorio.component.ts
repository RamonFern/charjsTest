import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AgenteUser } from './../../../../../models/AgenteUser';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Observable, take } from 'rxjs';
import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { DialogReturn } from 'src/app/models/dialog-return';
import { HorarioAgenteRequest } from 'src/app/models/horarioAgenteRequest';
import { HorarioAgenteResponse } from 'src/app/models/horarioAgenteResponse';
import { RelatorioRequest } from 'src/app/models/relatorio-request';
import { AgenteService } from 'src/app/services/agente.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { HorarioService } from 'src/app/services/horario.sevice';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-NovoRelatorio',
  templateUrl: './NovoRelatorio.component.html',
  styleUrls: ['./NovoRelatorio.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoRelatorioComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;

  formularios: FormGroup[] = [];

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
  agentesFaltosos: AgenteUser[] = [];
  agentesFaltosos2: AgenteUser[] = [];
  agenteDeFolga!: AgenteUser;
  agenteParaPermulta!: AgenteUser;
  agenteEscolhidoParaReforco!: AgenteUser;
  agenteQueFaltou!: AgenteUser;
  agentesQueFaltaram: HorarioAgenteRequest[] = [];
  escolha!: string
  escolha2!: string;
  escolha3!: string;
  equipes: EquipeResponse[] = [];
  equipeSelecionada!: EquipeResponse;
  equipeSelecionada2!: EquipeResponse;
  equipe!: EquipeResponse;
  registroDeHoras: HorarioAgenteResponse[] = [];
  registroDeHora!: HorarioAgenteResponse;
  isLoading: boolean = false;

  alteracao: string[] = ['sim', 'não'];
  faltas: string[] = ['sim', 'não'];
  alteracaoEscolha!: string;
  permulta: string[] = ['sim', 'nao'];
  dataForm = new FormGroup({
    dataRelatorio: new FormControl('', Validators.required)
  })

  textRelatorioForm = new FormGroup({
    text1: new FormControl('', Validators.required),
    text2: new FormControl(''),
    text3: new FormControl(''),
  })

  horariosForms: FormGroup[] = [];
  horariosFolgaForms: FormGroup[] = [];
  agentesComHorarioSalvo: number[] = [];
  agentesDeReforcoComHorarioSalvo: number[] = [];
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';

  text1!: string;
  text2!: string;
  text3!: string;
  dataRelatorio!: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: { relatorio: RelatorioRequest },
              private breakpointObserver: BreakpointObserver,
              private agenteService: AgenteService, private fb: FormBuilder,
              public dialogRef: MatDialogRef<NovoRelatorioComponent>,
              private notification: MatSnackBar,
              private horarioService: HorarioService,
              private equipeService: EquipeService,
              private cdr: ChangeDetectorRef,
              private relatorioService: RelatorioService) {

              }

  ngOnInit() {
    this.alteracaoEscolha = this.alteracao[1].toString();
    this.listarAgentes();
    this.listarEquipes();

    this.breakpointObserver
        .observe(['(max-width: 768px)'])
        .subscribe(result => {
          this.stepperOrientation = result.matches ? 'vertical' : 'horizontal';
          this.cdr.detectChanges(); // força update na tela
        });


  }

  mostraRelatorio() {
    this.text1 = this.textRelatorioForm.controls['text1'].value;
    this.text2 = this.textRelatorioForm.controls['text2'].value;
    this.text3 = this.textRelatorioForm.controls['text3'].value;
  }

  formatarData(date: Date, hora: number, minuto: number) {
      const d = new Date(date);
      d.setHours(hora, minuto, 0, 0);
      return d.toISOString().slice(0, 16);
  };

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
    const data = moment(this.dataForm.controls['dataRelatorio'].value);
    const d = new Date(data.toISOString());

    const chegada = this.formatarData(d, 5, 0);   // 08:00
    const saida   = this.formatarData(d, 17, 0);  // 20:00

    this.equipeSelecionada = equipe;
    this.equipeSelecionada2 = JSON.parse(JSON.stringify(equipe));

    this.horariosForms = this.equipeSelecionada2?.membros?.map(agente =>
      this.fb.group({
        chegada: [chegada, Validators.required],
        saida: [saida, Validators.required],
        atraso: [0],
        justificativa: ['']
      })
    );
  }

  escolherOutraEquipe() {
    this.agentesDaEquipe = [];
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

  selecionarAgenteQueFaltou(agente: AgenteUser) {
    this.agenteQueFaltou = agente;
  }

  addAosAgentesFalta() {
    this.agentesFaltosos.push(this.agenteQueFaltou);
    this.agentesFaltosos2.push(this.agenteQueFaltou);
  }

  ouveFaltas() {
    this.agentesFaltosos2 = this.agentesFaltosos.filter( a => !this.agentesDaEquipe.includes( a ));
    this.escolha3 === "sim" ? null : this.removerAgentesFalta();
  }

  addAgenteReforco() {
    const novoAgente = { ...this.agenteEscolhidoParaReforco };
    this.agentesDeFolgaParaReforco.push(novoAgente);
    this.agentesDeFolgaParaReforco2.push(novoAgente);
    const data = moment(this.dataForm.controls['dataRelatorio'].value);
    const d = new Date(data.toISOString());

    const chegada = this.formatarData(d, 5, 0);   // 08:00
    const saida   = this.formatarData(d, 17, 0);  // 20:00

    this.horariosFolgaForms = this.agentesDeFolgaParaReforco2?.map(agente =>
      this.fb.group({
        chegada: [chegada, Validators.required],
        saida: [saida, Validators.required],
        atraso: [0],
        justificativa: ['']
      })
    );
  }

  removerAgenteReforco() {
    this.agentesDeFolgaParaReforco = [];
    this.agentesDeFolgaParaReforco2 = [];
  }

  removerAgentesFalta() {
    this.agentesFaltosos = [];
    this.agentesFaltosos2 = [];
  }

  ouvePermulta(){
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

  salvarHorarios(id: number, i: number) {
    const form = this.horariosForms[i];

    const request: HorarioAgenteRequest = {
      agente_id: id,
      dataHoraInicio: form.controls['chegada'].value,
      dataHoraFim: form.controls['saida'].value,
      atraso: form.controls['atraso'].value,
      falta: this.agentesFaltosos2.some(agente => agente.id === id),
      justificativaFalta: form.controls['justificativa'].value,
    }

    this.horarioService.salvar(request)
        .pipe(take(1))
        .subscribe((a) => {
          this.registroDeHoras.push(a);
          this.registroDeHora = a;
          this.agentesComHorarioSalvo.push(id);
          this.horariosForms[i].controls['justificativa'].setValue('');
          this.equipeSelecionada2.membros = this.equipeSelecionada2.membros.filter((_, index) => index !== i);
          this.cdr.detectChanges();
          this.notification.open(`Hora adicionada com sucesso!`, 'Sucesso', { duration: 3000 });
        })
  }

  salvarHorarios2(id: number, i: number) {
    const form = this.horariosFolgaForms[i];

    const request: HorarioAgenteRequest = {
      agente_id: id,
      dataHoraInicio: form.controls['chegada'].value,
      dataHoraFim: form.controls['saida'].value,
      atraso: form.controls['atraso'].value,
      falta: this.agentesFaltosos2.some(agente => agente.id === id),
      justificativaFalta: form.controls['justificativa'].value,
    }

    this.horarioService.salvar(request)
    .pipe(take(1))
    .subscribe((a) => {
      this.registroDeHoras.push(a);
      this.agentesComHorarioSalvo.push(id);
      this.horariosFolgaForms[i].controls['justificativa'].setValue('');
      this.agentesDeFolgaParaReforco2 = this.agentesDeFolgaParaReforco2.filter((_, index) => index !== i);
      this.cdr.detectChanges();
      this.notification.open(`Hora adicionada com sucesso!`, 'Sucesso', { duration: 3000 });
    })
  }

  salvarRelatorio() {
    const agentesDaEquipe = this.equipeSelecionada.membros.map((a) => a.nome).join(", ");
    const agentesParaPermulta = this.agentesParaPermulta.map((a) => a.nome).join(", ");
    const agentesDeFolgaEscolhidoParaPermulta = this.agentesDeFolgaEscolhidoParaPermulta2.map((a) => a.nome).join(", ");
    const agentesDeFolgaParaReforco = this.agentesDeFolgaParaReforco.map((a) => a.nome).join(", ");
    const agentesQueFaltaram = this.agentesFaltosos2.map((a) => a.nome).join(", ");
    const inspetores = this.equipeSelecionada?.membros.filter(agente => agente.funcao === "INSPETOR")
                                                      .map(agente => agente.nome).join(", ");
    this.isLoading = true;

    const dataAtual = moment();
    const request: RelatorioRequest = {
      datadorelatorio: this.dataRelatorio,
      datadehoje: dataAtual.format("DD/MM/YYYY"),
      nomeequipe: this.equipeSelecionada.nome,
      nomeinspetor: inspetores,
      agentesdaequipe: agentesDaEquipe,
      agentesparapermultar: agentesParaPermulta ? agentesParaPermulta : "sem permulta",
      agentedefolgaparapermultar: agentesDeFolgaEscolhidoParaPermulta ? agentesDeFolgaEscolhidoParaPermulta : "sem permulta",
      agentesparareforco: agentesDeFolgaParaReforco ? agentesDeFolgaParaReforco : "sem reforço",
      agentesfaltoso: agentesQueFaltaram ? agentesQueFaltaram : "sem faltas",
      alteracao: this.alteracaoEscolha ? "não" : "sim" ,
      texto1: this.text1,
      texto2: this.text2 ? this.text2 : " ",
      texto3: this.text3 ? this.text3 : " ",
    }

    this.relatorioService.salvarRelatorio(request)
        .pipe(take(1))
        .subscribe((rel) => {
          this.limpar();
          this.isLoading = false;
          const dialogReturn: DialogReturn = { hasDataChanged: true };
          this.dialogRef.close(dialogReturn);
          this.notification.open('Relatório Criado', 'Sucesso', { duration: 3000 });
        })
  }

  limpar() {
    this.dataForm.reset();
    this.dataRelatorio = '';
    this.agentesDaEquipe = [];
    this.escolha = '';
    this.equipeSelecionada.id = 0;
    this.equipeSelecionada.nome = '';
    this.agentesDeFolgaEscolhidoParaPermulta = [];
    this.agentesDeFolgaEscolhidoParaPermulta2 = [];
    this.agentesFaltosos = [];
    this.agentesFaltosos2 = [];
    this.escolha3 = '';
    this.agentesDeFolgaParaReforco = [];
    this.agentesDeFolgaParaReforco2 = [];
    this.escolha2 = '';
    this.agentesDaEquipeParaSalvar = [];
    this.agentesParaPermulta = [];
    this.text1 = '';
    this.text2 = '';
    this.text3 = '';
    this.textRelatorioForm.reset();
  }

}
