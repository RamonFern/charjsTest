import { AgenteService } from 'src/app/services/agente.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HorarioService, ResumoHoras } from 'src/app/services/horario.sevice';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HorarioAgenteResponse } from 'src/app/models/horarioAgenteResponse';

@Component({
  selector: 'app-resumo-horas',
  templateUrl: './resumo-horas.component.html',
  styleUrls: ['./resumo-horas.component.css']
})
export class ResumoHorasComponent implements OnInit {
  @Input() agenteId!: number; // O ID do agente vem da tela anterior
  dataInicio!: Date;
  dataFim!: Date;
  resumoHoras: ResumoHoras | null = null;
  registroHorasPorAgente: HorarioAgenteResponse[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  agente!: AgenteUser;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: number,
              private resumoHorasService: HorarioService,
              private agenteService: AgenteService) { }

  ngOnInit(): void {
    this.agenteId = this.data;
    this.buscarHoras();
    this.buscarAgentePeloId();

  }

  buscarAgentePeloId() {
    this.agenteService
        .buscarPorId(this.agenteId)
        .pipe(take(1))
        .subscribe((a) => {
          this.agente = a;
        })
  }

  buscarHoras() {
    if (!this.dataInicio || !this.dataFim) {
      this.error = 'Por favor, selecione ambas as datas!';
      return;
    }

    this.isLoading = true;
    this.error = null;

    // Convertendo para o formato ISO correto
    const inicioFormatado = this.dataInicio.toISOString();
    const fimFormatado = this.dataFim.toISOString();

    // console.log(this.agenteId)
    this.resumoHorasService
        .calcularHoras(this.agenteId, inicioFormatado, fimFormatado)
        .pipe(take(1))
        .subscribe((data) => {
          this.resumoHoras = data;
          this.isLoading = false;
        })
  }

  registrosDeAgentePeloId() {
    // Convertendo para o formato ISO correto
    const inicioFormatado = this.dataInicio.toISOString();
    const fimFormatado = this.dataFim.toISOString();

    this.resumoHorasService
        .buscarRegistrosPeloIdAgente(this.agenteId, inicioFormatado, fimFormatado)
        .pipe(take(1))
        .subscribe((a) => {
          this.registroHorasPorAgente = a;
        })
  }

  calcularHoras(inicio: string, fim: string): string {
    if (!inicio || !fim) return 'Falta';

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    const diffMs = dataFim.getTime() - dataInicio.getTime();

    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${horas}h ${minutos}min`;
  }

  imprimir() {

    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Adiciona a logo se disponível
    if (environment.logoBase64) {
      doc.addImage(environment.logoBase64, 'PNG', margin, 10, 25, 25);
    }

    // Nome da instituição
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text(`Prefeitura Municipal de Rosário`, pageWidth / 2, 20, { align: 'center' });
    doc.text(`Departamento Municipal de Trânsito e Transporte - DMTT`, pageWidth / 2, 25, { align: 'center' });
    doc.text(`Relatório de Horas e faltas `, pageWidth / 2, 30, { align: 'center' });
    doc.text(`Agente: ${this.agente.nome}`, pageWidth / 2, 35, { align: 'center' });
    //adiciona a tabela no pdf
    autoTable(doc, {
      html: '#tabela-pdf', // ID da sua tabela no HTML
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] }, // cor do cabeçalho
      margin: { top: 50 },
    });

    // Adiciona o conteúdo justificado
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    doc.text(`Resumo de Horas Trabalhadas` , 20, 175, { align: 'left' });
    doc.text(`Total de horas: ${this.resumoHoras?.horas}h ${this.resumoHoras?.minutos}min` , 20, 180, { align: 'left' });
    doc.text(`Total de Faltas: ${this.resumoHoras?.totalFaltas}` , 20, 185, { align: 'left' });

    // Baixar o PDF
    doc.save(`relatorio_de_horas${this.agente.nome}.pdf`);
  }

}
