import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith, take } from 'rxjs';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import pdfjsLib from 'pdfjs-dist'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { DadosVeiculo } from 'src/app/models/veiculo-inf';

export interface TabCodigos {
  codDescricao: string;
  amparo: string;
  gravidade: string;
  valor: number;
  competencia: string;
}

@Component({
  selector: 'app-notificar',
  templateUrl: './notificar.component.html',
  styleUrls: ['./notificar.component.css']
})
export class NotificarComponent implements OnInit {
  codCtrl = new FormControl('');
  formPlaca = new FormGroup({
    placa: new FormControl('', Validators.required),
  })
  formMarcaModeloEsp = new FormGroup({
    marcaModelo: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required)
  })
  filteredCods: Observable<TabCodigos[]>;
  dadosVeiculo!: DadosVeiculo | any;

  codigos: TabCodigos[] = [
    {
      codDescricao: '7480-1 | Aprovar proj edificação pólo atrativo trânsito s/ anuência órgão/entid trânsito',
      amparo: '93 c/c 95, § 4º',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7480-2 | Aprovar proj edificação pólo atrativo trâns s/ estacion/indicação vias de acesso',
      amparo: '93 c/c 95, § 4º',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7498-0 | Ñ sinalizar devida/imed obstáculo à circul/segurança veíc/pedestre pista/calçada',
      amparo: '94',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7501-0 | Utilizar ondulação transversal/sonorizador fora padrão/critério estab p/ Contran',
      amparo: '94, § único',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7510-1 | Iniciar obra perturbe/interrompa circulação/segurança veíc/pedestres s/permissão',
      amparo: '95',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7510-2 | Iniciar evento perturbe/interrompa circulaç/segurança veíc/pedestres s/permissão',
      amparo: '95',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7528-1 | Não sinalizar a execução ou manutenção da obra',
      amparo: '95, § 1º',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7528-2 | Não sinalizar a execução ou manutenção do evento',
      amparo: '95, § 1º',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '7536-0 | Não avisar comunidade c/ 48h antec interdição via indicando caminho alternativo',
      amparo: '95, § 2º',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      codDescricao: '5010-0 | Dirigir veículo sem possuir CNH ou Permissão para Dirigir',
      amparo: '162, I',
      gravidade: '7 - Gravíss 3X',
      valor:  574.62,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5029-1 | Dirigir veículo com CNH ou PPD cassada',
      amparo: '162, II',
      gravidade: '7 - Gravíss 5X',
      valor: 957.70,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5029-2 | Dirigir veículo com CNH ou PPD com suspensão do direito de dirigir',
      amparo: '162, II',
      gravidade: '7 - Gravíss 5X',
      valor: 957.70,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5037-1 | Dirigir veículo com CNH de categoria diferente da do veículo',
      amparo: '162, III',
      gravidade: '7 - Gravíss 3X',
      valor: 574.62,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5037-2 | Dirigir veículo com PPD de categoria diferente da do veículo',
      amparo: '162, III',
      gravidade: '7 - Gravíss 3X',
      valor: 574.62,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5045-0 | Dirigir veículo com validade de CNH/PPD vencida há mais de 30 dias',
      amparo: '162, V',
      gravidade: '7 - Gravíss',
      valor:  191.54,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5053-1 | Dirigir veículo sem usar lentes corretoras de visão',
      amparo: '162, VI',
      gravidade: '7 - Gravíss',
      valor:  191.54,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5053-2 | Dirigir veículo sem usar aparelho auxiliar de audição',
      amparo: '162, VI',
      gravidade: '7 - Gravíss',
      valor:  191.54,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5053-3 | Dirigir veículo sem usar aparelho auxiliar de prótese física',
      amparo: '162, VI',
      gravidade: '7 - Gravíss',
      valor:  191.54,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5053-4 | Dirigir veículo s/ adaptações impostas na concessão/renovação licença conduzir',
      amparo: '162, VI',
      gravidade: '7 - Gravíss',
      valor:  191.54,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5061-0 | Entregar veículo a pessoa sem CNH ou Permissão para Dirigir',
      amparo: '163 c/c 162, I',
      gravidade: '7 - Gravíss 3X',
      valor: 574.62,
      competencia: 'ESTADUAL/RODOV',
    },
    {
      codDescricao: '5070-1 | Entregar veículo a pessoa com CNH ou PPD cassada',
      amparo: '163 c/c 162, II',
      gravidade: '7 - Gravíss 5X',
      valor: 957.70,
      competencia: 'ESTADUAL/RODOV',
    }
  ];

  constructor(private veiculoService: VeiculoService) {
    this.filteredCods = this.codCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this.filterStates(state) : this.codigos.slice())),
    );
  }

  ngOnInit() {
  }

  buscarInformacao() {
    const placa = { placa: this.formPlaca.controls['placa'].value };
    this.veiculoService.solicitar(placa)
        .pipe(take(1))
        .subscribe((veiculo: DadosVeiculo) => {
          this.dadosVeiculo = veiculo;
          // this.resumirInformacoes();
          this.preencherValores();
          console.log(this.dadosVeiculo);
          // this.formPlaca.reset();
        })
  }

  preencherValores() {
    const marcamodelo = `${this.dadosVeiculo.response.MARCA}, ${this.dadosVeiculo.response.MODELO}, ${this.dadosVeiculo.response.cor}`;
    this.formMarcaModeloEsp.controls['marcaModelo'].setValue(marcamodelo);
    this.formMarcaModeloEsp.controls['especie'].setValue('passageiro');
  }

  private filterStates(value: string): TabCodigos[] {
    const filterValue = value.toLowerCase();

    return this.codigos.filter(state => state.codDescricao.toLowerCase().includes(filterValue));
  }

  pdfRead() {
     // Caminho para o arquivo PDF
    const pdfUrl = '/assets/pdf/Enquadramento.pdf';
    // Especifique o caminho para o arquivo de worker do pdf.js
    GlobalWorkerOptions.workerSrc = 'pdf.worker.js';
     // Carregar o PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
      // Número total de páginas do PDF
      var pdfTeste = pdf;
      console.log(pdfTeste);

      const numPages = pdf.numPages;
      console.log(`Número de páginas: ${numPages}`);

      // Ler o texto de cada página
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
          page.getTextContent().then(textContent => {
            const pageText = textContent.items.map(item => item).join(' ');
            console.log(`Texto da página ${pageNum}:`);
            console.log(pageText);
          });
        });
      }
    });
  }
}



