import { RelatorioRequest } from './../../../models/relatorio-request';
import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { take } from 'rxjs';
import jsPDF from 'jspdf';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { MatDialog } from '@angular/material/dialog';
import { NovoRelatorioComponent } from './dialogs/NovoRelatorio/NovoRelatorio.component';
import { DialogReturn } from 'src/app/models/dialog-return';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: [ './endereco.component.css' ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
})
export class EnderecoComponent implements OnInit {



  relatorios: RelatorioRequest[] = [];
  addRelatorio = false;

  constructor(private relatorioService: RelatorioService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.buscarRelatorios();
  }

  novoRelatorio() {
    const dialogRef = this.dialog.open(NovoRelatorioComponent, {
            width: '1250px',
          });

          dialogRef.afterClosed().subscribe((result: DialogReturn) => {
            if (result?.hasDataChanged) {
              this.buscarRelatorios();
            }
        });
  }

  editarRelatorio(relatorio: RelatorioRequest) {
    // const dialogRef = this.dialog.open(NovoRelatorioComponent, {
    //         width: '1250px',
    //         data: relatorio
    //       });// CONTINUAR FAZENDO O EDITAR RELATORIO

    //       dialogRef.afterClosed().subscribe((result: DialogReturn) => {
    //         if (result?.hasDataChanged) {
    //           this.buscarRelatorios();
    //         }
    //     });
  }

  voltarListagemRelatorio() {
    this.addRelatorio = false;
  }

  buscarRelatorios() {
    this.relatorioService.buscarTodos()
        .pipe((take(1)))
        .subscribe((rel) => {
          this.relatorios = rel.reverse();
        })
  }

  generatePDF2(relatorio: RelatorioRequest) {

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
    doc.text(`Relatório do dia ${relatorio.datadorelatorio}`, pageWidth / 2, 30, { align: 'center' });
    doc.text(`Equipe: ${relatorio.nomeequipe}`, pageWidth / 2, 35, { align: 'center' });
    // Título do documento
    const maxWidth = pageWidth - margin * 2;
    doc.setFontSize(11);
    doc.text(`Agentes da equipe:` , 20, 50, { align: 'left' });
    doc.text(`${relatorio.agentesdaequipe}` , 20, 55, { maxWidth: maxWidth, align: 'left' });
    doc.text(`Permulta:` , 20, 70, { align: 'left' });
    doc.text(`${relatorio.agentesparapermultar}` , 20, 75, { align: 'left' });
    doc.text(`Permultou com:` , 20, 80, { align: 'left' });
    doc.text(`${relatorio.agentedefolgaparapermultar}` , 20, 85, { align: 'left' });
    doc.text(`Reforço:` , 20, 90, { align: 'left' });
    doc.text(`${relatorio.agentesparareforco}` , 20, 95, { maxWidth: maxWidth, align: 'left' });
    doc.text(`Faltas:` , 20, 110, { align: 'left' });
    doc.text(`${relatorio.agentesfaltoso}` , 20, 115, { align: 'left' });

    // Adiciona o conteúdo justificado
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    const textY = 125;
    // const maxWidth = pageWidth - margin * 2;
    doc.text(`${relatorio.texto1} ${relatorio.texto2} ${relatorio.texto3}` , margin, textY, { maxWidth: maxWidth, align: 'justify' });

    // Rodapé com data e assinatura centralizados
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Inspetor`, pageWidth / 2, pageHeight - 30, { align: 'center' });
    doc.text(`${relatorio.nomeinspetor}`, pageWidth / 2, pageHeight - 20, { align: 'center' });
    // Baixar o PDF
    doc.save(`relatorio_do_dia_${relatorio.datadorelatorio}.pdf`);
  }

}



