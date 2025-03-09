import { AgenteUser } from './../../../../../models/AgenteUser';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { take } from 'rxjs';
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
  equipe!: EquipeResponse;
  registroDeHoras: HorarioAgenteResponse[] = [];


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

  horariosForm = new FormGroup({
    chegada: new FormControl('', Validators.required),
    saida: new FormControl('', Validators.required),
    justificativa: new FormControl('', Validators.required),
  })

  horariosAgentesFolgaForm = new FormGroup({
    chegada: new FormControl('', Validators.required),
    saida: new FormControl('', Validators.required),
  })

  text1!: string;
  text2!: string;
  text3!: string;
  dataRelatorio!: string

  constructor(private agenteService: AgenteService, private fb: FormBuilder,
              public dialogRef: MatDialogRef<NovoRelatorioComponent>,
              private notification: MatSnackBar,
              private horarioService: HorarioService,
              private equipeService: EquipeService,
              private relatorioService: RelatorioService) { }

  ngOnInit() {
    this.alteracaoEscolha = this.alteracao[1].toString();
    this.listarAgentes();
    this.listarEquipes();
  }

  mostraRelatorio() {
    this.text1 = this.textRelatorioForm.controls['text1'].value;
    this.text2 = this.textRelatorioForm.controls['text2'].value;
    this.text3 = this.textRelatorioForm.controls['text3'].value;
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
    // CONTINUAR AQUI FAZENDO O FILTRO P/SEPARAR OS AGENTES
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
    this.agentesDeFolgaParaReforco.push(this.agenteEscolhidoParaReforco);
    this.agentesDeFolgaParaReforco2.push(this.agenteEscolhidoParaReforco);
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

  salvarHorarios(id: number) {
    const data = moment(this.dataForm.controls['dataRelatorio'].value);
    const request: HorarioAgenteRequest = {
      usuarioId: id,
      data: data.format("YYYY-MM-DD"),
      horaEntrada: this.agentesFaltosos2.some(agente => agente.id === id) ? null : this.horariosForm.controls['chegada'].value,
      horaSaida: this.agentesFaltosos2.some(agente => agente.id === id) ? null : this.horariosForm.controls['saida'].value,//agentes.some(agente => agente.id === id);
      falta: this.agentesFaltosos2.some(agente => agente.id === id) ? true : false, //this.escolha3 === "sim" ? true : false,
      justificativaFalta: this.horariosForm.controls['justificativa'].value,
    }
    console.log(request);

    this.horarioService.salvar(request)
        .pipe(take(1))
        .subscribe((a) => {
          this.registroDeHoras.push(a);
          this.notification.open(`Hora adicionada com sucesso!`, 'Sucesso', { duration: 3000 });
          console.log(this.registroDeHoras);

        })
  }

  salvarHorarios2(id: number) {
    const data = moment(this.dataForm.controls['dataRelatorio'].value);
    const request: HorarioAgenteRequest = {
      usuarioId: id,
      data: data.format("YYYY-MM-DD"),
      horaEntrada: this.agentesFaltosos2.some(agente => agente.id === id) ? null : this.horariosForm.controls['chegada'].value,
      horaSaida: this.agentesFaltosos2.some(agente => agente.id === id) ? null : this.horariosForm.controls['saida'].value,//agentes.some(agente => agente.id === id);
      falta: this.agentesFaltosos2.some(agente => agente.id === id) ? true : false, //this.escolha3 === "sim" ? true : false,
      justificativaFalta: this.horariosForm.controls['justificativa'].value,
    }
    console.log(request);

    this.horarioService.salvar(request)
    .pipe(take(1))
    .subscribe((a) => {
      console.log(a);
      this.registroDeHoras.push(a);
    })
  }

  salvarRelatorio() {
    const agentesDaEquipe = this.equipeSelecionada?.membros.filter((a) => a.nome).join(", ");
    const agentesParaPermulta = this.agentesParaPermulta.map((a) => a.nome).join(", ");
    const agentesDeFolgaEscolhidoParaPermulta = this.agentesDeFolgaEscolhidoParaPermulta2.map((a) => a.nome).join(", ");
    const agentesDeFolgaParaReforco = this.agentesDeFolgaParaReforco.map((a) => a.nome).join(", ");
    const agentesQueFaltaram = this.agentesDeFolgaParaReforco.map((a) => a.nome).join(", ");
    const inspetores = this.equipeSelecionada?.membros.filter(a => a.funcao === 'INSPETOR').join(", ");

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

    console.log(request);

    this.relatorioService.salvarRelatorio(request)
        .pipe(take(1))
        .subscribe((rel) => {
          this.criarPDF();

          this.limpar();
          const dialogReturn: DialogReturn = { hasDataChanged: true };
          this.dialogRef.close(dialogReturn);
          this.notification.open('Relatório Criado', 'Sucesso', { duration: 3000 });
        })
  }

  criarPDF() {
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('PdfRelatorio.pdf');
      }
    })
  }

  generatePDF() {
    const doc = new jsPDF();

    // Configurações iniciais
    const marginLeft = 10; // Margem esquerda
    let verticalPosition = 10; // Posição vertical inicial

    // Função para adicionar texto com espaçamento
    const addText = (text: string, fontSize: number, isBold: boolean = false, align: 'left' | 'center' | 'right' = 'left') => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.text(text, marginLeft, verticalPosition, { align });
      verticalPosition += fontSize / 2 + 5; // Ajusta a posição vertical
    };

    // Cabeçalho
    addText('Relatório de Plantão', 18, true, 'center');
    verticalPosition += 5; // Espaçamento extra
    addText(`Data: ${new Date().toLocaleDateString()}`, 12);
    addText(`Equipe: Equipe Alpha`, 12);
    // doc.text(occurrences, marginLeft, verticalPosition, { maxWidth: 180, align: 'justify' });
    // verticalPosition += 10; // Espaçamento extra

    // Agentes
    addText('Agentes da Equipe:', 14, true);
    const agents = ['Agente 1', 'Agente 2', 'Agente 3'];
    agents.forEach(agent => addText(`- ${agent}`, 12));


    addText('Reforços:', 14, true);
    const reinforcements = ['Reforço 1', 'Reforço 2'];
    reinforcements.forEach(reinforcement => addText(`- ${reinforcement}`, 12));
    verticalPosition += 10; // Espaçamento extra

    // Faltas e Permutas
    addText('Faltas:', 14, true);
    addText('- Agente 4 (Justificada)', 12);

    addText('Permutas:', 14, true);
    addText('- Agente 5 ↔ Agente 6', 12);
    verticalPosition += 10; // Espaçamento extra

    // Ocorrências
    addText('Ocorrências no Plantão:', 14, true);
    const occurrences = `
      Durante o plantão, ocorreram várias situações que demandaram atenção:
      1. Incidente X foi resolvido rapidamente.
      2. Incidente Y exigiu suporte adicional.
      3. Todos os agentes colaboraram de forma eficiente.
    `;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(occurrences, marginLeft, verticalPosition, { maxWidth: 180, align: 'justify' });
    verticalPosition += 60; // Ajuste conforme o tamanho do texto

    // Rodapé
    addText('Inspetor Responsável:', 14, true);
    addText('Inspetor João Silva', 12);

    // Salvar o PDF
    doc.save('relatorio_plantao.pdf');
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
    this.escolha2 = '';
    this.agentesDaEquipeParaSalvar = [];
    this.agentesParaPermulta = [];
    this.text1 = '';
    this.text2 = '';
    this.text3 = '';
    this.textRelatorioForm.reset();
  }

}
